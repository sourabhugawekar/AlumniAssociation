import { HashLink } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import DIEMS from "../assets/DIEMS.png";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import axios from "axios";
const Header = () => {
  // const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token) {
      setIsLoggedIn(true);

      if (user == "alumni") setUser("/alumni");
      if (user == "student") setUser("/studentprofile");
      if (user === "admin") setUser("/adminprofile");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log(user);
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    axios
      .get("/api/v1/user/logout")
      .then((res) => {
        if (res.data.status) {
          console.log(localStorage.getItem("authToken"));
          localStorage.removeItem("authToken");
          localStorage.removeItem("authUser");
          console.log(localStorage.getItem("authToken"));
          setIsLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));

    enablePageScroll();
    setOpenNavigation(false);
  };

  // const handleClick = () => {
  //   if (!openNavigation) return;

  //   enablePageScroll();
  //   setOpenNavigation(false);
  // };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[12rem] xl:mr-8" to="/">
          <img src={DIEMS} width={210} height={100} alt="Brainwave" />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <HashLink
                smooth
                key={item.id}
                to={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold  lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </HashLink>
            ))}
          </div>

          <HamburgerMenu />
        </nav>
        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>
            <Link to="/login">
              <Button className="hidden lg:flex">Sign in</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-5">
              <Button className="hidden lg:flex">
                <button type="submit" onClick={handleLogout}>
                  {" "}
                  Log out{" "}
                </button>
              </Button>
              <Link to={`${user}`}>
                <Button className="hidden lg:flex">
                  <button type="submit"> Profile </button>
                </Button>
              </Link>
            </div>
          </>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

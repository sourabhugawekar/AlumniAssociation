import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { GradientLight } from "./design/Benefits";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;
  


  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/user/login", {
        email,
        password,
        role,
      })
      .then((result) => {
        console.log(result);
        console.log(result.data);
        console.log(result.data.token);
        console.log(result.data.message);

        if (result.data.token) {
          localStorage.setItem("authToken", result.data.token);
          localStorage.setItem("authUser", result.data.message);
        }
        
        if (result.data.status && result.data.message === "admin") {

          navigate("/adminprofile");
          window.location.reload();
        } else if (result.data.status && result.data.message === "alumni") {
          navigate("/alumni");
          window.location.reload();
          
        } else {
          navigate("/studentprofile");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Invalid email or password. Please try again.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "bg-n-7 text-white",
          },
        });
      });
  };

  return (
    <Section>
      <div className="relative z-1 max-w-[35rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Login" />
          <form className="flex flex-col" action="post" onSubmit={HandleSubmit}>
            <input
              placeholder="Email"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <Button className="hidden lg:flex">Login</Button>
          </form>
          <p className="text-white mt-4">
            Don&apos;t have an account ?
            <Link
              className="text-sm text-blue-500 -200 hover:underline mt-4"
              to={"/signup"}
            >
              Register
            </Link>
          </p>
          <p className="text-white mt-4">
          Forgot Password ? 
            <Link
              className="text-sm text-blue-500 -200 hover:underline mt-4"
              to={"/forgotpassword"}
            >
              Changed Password 
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Login;

import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

import { useState } from "react";
import Fees from "./Fees";
import Swal from "sweetalert2";

const Donation = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/donate/donation", {
        phoneNumber,
        item,
        quantity,
      })
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Success!",
          text: "Thank you for your donation!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/donation");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong with your donation.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <Section>
      {/* <div className="flex flex-wrap gap-40 mb-10 justify-center"> */}
      {/* First Form */}

      <div className="relative z-1 max-w-[35rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="w-[10em] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading
            className="md:max-2-md lg:max-w-2xl"
            title="Infrastructure 
            Donation"
          />
          <form className="flex flex-col" action="post" onSubmit={HandleSubmit}>
            <input
              placeholder="Phone Number "
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="tel"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <select
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              id="infrastructure"
              name="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            >
              <option value="">Select Infrastructure to Donate </option>
              <option value="systems">Systems</option>
              <option value="Desks">Desks</option>
              <option value="plants">Plants</option>
            </select>
            <input
              placeholder="Quantity"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <Button className="hidden lg:flex">Donate</Button>
          </form>
        </div>
      </div>

      {/* Second Form */}

      {/* </div> */}
      <Fees />
    </Section>
  );
};

export default Donation;

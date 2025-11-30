import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScholarshipForm = () => {
  const [fullName,setFullName] = useState();
  const [email,setEmail] = useState();
  const [caste,setCaste] = useState();
  const [annualFee,setAnnualFee] = useState();
  const [reason,setReason] = useState();
  const navigate = useNavigate();

   
  const HandleSubmit = (e) =>{
    const numberAnnualFee = Number(annualFee);
    e.preventDefault();
    const sendData = {
      fullName,
      email,
      caste,
      annualFee : numberAnnualFee,
      reason,
    };

    axios.post("/api/v1/donate/studentScholarshipForm",sendData)
    .then((response) => {
      console.log(response);
      if(response.data.success) {
        navigate("/profile");
      }
    }).catch(error => console.log(error));
  }
  

  return (
    <Section>
      <div className="relative z-1 max-w-[35rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Form" />
          <form className="flex flex-col" onSubmit={HandleSubmit}>
            <input
              placeholder="Full Name"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="fullname"
              onChange={e =>setFullName(e.target.value)}
            />
            <input
              placeholder="Email Address"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="email"
              name="email"
              onChange={e =>setEmail(e.target.value)}

            />
            <input
              placeholder="Caste"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="caste"
              onChange={e =>setCaste(e.target.value)}

            />
            <input
              placeholder="Annual Fees"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="fees"
              onChange={e =>setAnnualFee(e.target.value)}

            />
            <textarea
              placeholder="Reason for application"
              className="bg-n-7 text-n-3
              border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none
              focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              name="reason"
              onChange={e =>setReason(e.target.value)}

            ></textarea>

            <Button className="hidden lg:flex">Apply</Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ScholarshipForm;

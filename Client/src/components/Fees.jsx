import Heading from "../components/Heading";
import ScholarshipTable from "./ScholarshipTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Swal from "sweetalert2";

const Fees = () => {
  useEffect(() => {
    axios
      .get("/api/v1/donate/getAllStudentForm")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFeesSelection = (person) => {
    setSelectedPerson(person);
  };
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState({});
  //   const selPerson = {
  //     name: selectedPerson.name,
  //     category: selectedPerson.category,
  //     fees: selectedPerson.fees,
  //   };
  const [phoneNumber, setPhoneNumber] = useState();
  const [payFee, setPayFee] = useState();
  const FeesHandle = (e) => {
    e.preventDefault();
    console.log(selectedPerson);
    axios
      .post("/api/v1/donate/fees", {
        studentName: selectedPerson.fullName,
        category: selectedPerson.caste,
        fees: selectedPerson.annualFee,
        payFee,
        phoneNumber,
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
    <div className="relative z-1 max-w-[60rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
      <div className="w-[30rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
        <Heading
          className="md:max-2-md lg:max-w-2xl"
          title="Student's Fees Donation"
        />
        <form className="flex flex-col" action="post" onSubmit={FeesHandle}>
          <input
            placeholder="Phone Number"
            className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              // Validate that the phone number is 10 digits
              if (/^\d{0,10}$/.test(value)) {
                setPhoneNumber(value);
              }
            }}
            required
          />
          <ScholarshipTable onFeesSelect={handleFeesSelection} />

          {selectedPerson && (
            <div className="mb-5">
              <h3 className="text-lg font-semibold">
                Selected Student: {selectedPerson.fullName}
              </h3>
              <p>Category: {selectedPerson.caste}</p>
              <p>Fees: ${selectedPerson.annualFee}</p>
              <input
                placeholder="You can Contribute"
                className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
                type="tel"
                name="payFee"
                value={payFee}
                onChange={(e) => setPayFee(e.target.value)}
                required
              />
            </div>
          )}
          <Button className="hidden lg:flex">Pay</Button>
        </form>
      </div>
    </div>
  );
};

export default Fees;

import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const JobPosting = () => {
  var token = localStorage.getItem("authToken");
  const user = jwtDecode(token);
  const [details, setDetails] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    jobType: "",
    jobDescription: "",
    qualifications: "",
    applicationLink: "",
    applicationDeadline: "",
    user: user,
  });
  // const navigate = useNavigate();
  const inputEvents = (event) => {
    const { name, value } = event.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      var body = JSON.stringify(details);

      console.log(body);

      const response = await fetch("/api/v1/job/postjob", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response) {
        var data = await response.json();
        if (data.message) {
          Swal.fire({
            title: "Success!",
            text: "Job has been posted successfully",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
            customClass: {
              popup: "bg-n-7 text-white",
            },
          });
          // Clear the form after successful submission
          setDetails({
            jobTitle: "",
            companyName: "",
            jobLocation: "",
            jobType: "",
            jobDescription: "",
            qualifications: "",
            applicationLink: "",
            applicationDeadline: "",
            user: user,
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while posting the job",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-n-7 text-white",
        },
      });
    }
  };

  return (
    <Section>
      <div className="relative z-1 max-w-[50rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Post Jobs" />
          <form className="flex flex-col" onSubmit={onSubmit}>
            <input
              placeholder="Job title"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="jobTitle"
              onChange={inputEvents}
            />
            <input
              placeholder="Company Name"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="companyName"
              onChange={inputEvents}
            />

            <input
              placeholder="Location"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="jobLocation"
              onChange={inputEvents}
            />
            <input
              placeholder="Job type"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="jobType"
              onChange={inputEvents}
            />
            <textarea
              className="w-full h-32 p-2 bg-n-7 text-n-3 border-0 rounded-md  mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150 resize-y"
              placeholder="Job Description"
              name="jobDescription"
              onChange={inputEvents}
            ></textarea>

            <textarea
              className="w-full h-32 p-2 bg-n-7 text-n-3 border-0 rounded-md  mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150 resize-y"
              placeholder="Qualifications"
              name="skillSet"
              onChange={inputEvents}
            ></textarea>
            <input
              placeholder="Application Link"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="applicationLink"
              onChange={inputEvents}
            />
            <input
              placeholder="Appplication Deadline"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="date"
              name="applicationDeadline"
              onChange={inputEvents}
            />

            <Button className="hidden lg:flex">Post</Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default JobPosting;

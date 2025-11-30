import React from 'react'
import { useLocation } from 'react-router-dom';
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailSender = () => {
const location = useLocation();
const email = location.state?.emailArray || [];
const [newSkill,setNewSkill] = useState([]);
const [emailSend,setEmailSend] = useState([email]);
const navigate = useNavigate();


const [subject,setSubject] = useState();
const [compose,setCompose] = useState();

const HandleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
        email,
        subject,
        compose,
    }

    axios.post("/api/v1/alumni/sendmail",sendData)
    .then(result => {
        console.log(result);
        if(result.data.success) {
            alert("Mail Send SuccessFully !");
            navigate("/profile");
        }
    }).catch(err => console.log(err));
}

const handleAddSkill = () => {
    if (newSkill.trim()) {
      const skillsToAdd = newSkill.split(",").map((skill) => skill.trim()); // Split by comma and trim whitespace
    //   setProfileInfo((prev) => ({
    //     ...prev,
    //     skills: [...prev.skills, ...skillsToAdd], // Spread the new skills into the existing array
    //   }));
        setEmailSend((prev) => ({
            ...prev,
            emailSend: [...emailSend,...skillsToAdd]

        }))  

      setNewSkill(""); // Clear the input after adding
    }
};

const handleRemoveSkill = (index) => {
    // setProfileInfo((prev) => ({
    //   ...prev,
    //   skills: prev.skills.filter((_, i) => i !== index),
    // }));
    emailSend.filter((_,i) => i !== index); 
  };

  return (
    <div>
      {/* <h1>Compose Email </h1>
      <p>Email List : {email.join(",")}</p> */}


      <Section id="contact">
      <div className="relative z-1 max-w-[50rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Send Email  " />
          <form className="flex flex-col" action="/profile">
           
            {/* <input
              placeholder="Email"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            
            <div className="">
          <h2 className="text-2xl font-semibold text-n-1 mb-4">Emails </h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {Array.isArray(email) &&
              email.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full">
                    {skill}
                  </span>
                  {/* {
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  } */}
                </div>
              ))}
          </div>

          {/* {
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border rounded px-4 py-2"
                placeholder="Add a Another Mail"
              />
              <button
                onClick={handleAddSkill}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Email
              </button>
            </div>
          } */}
        </div>

        <input
              placeholder="Subject "
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="name"
              name="fullname"
              required
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Compose the mail Body"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150 max-h-[30rem]"
              type="textarea"
              name="feedback"
              required
              onChange={(e) => setCompose(e.target.value)}
            />

            <Button className="hidden lg:flex" onClick={HandleSubmit}>
              <button type="submit">Submit</button>
            </Button>
          </form>
        </div>
      </div>
    </Section>
    </div>
  )
}

export default EmailSender

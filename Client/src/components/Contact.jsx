import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [feedback, setFeedback] = useState();
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/feedback/contact", {
        fullname,
        email,
        feedback,
      })
      .then((result) => {
        if (result.data === "submit") {
          navigate("/alumni");
          console.log("Feedback Submitted !");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Section id="contact">
      <div className="relative z-1 max-w-[50rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Feedback" />
          <form className="flex flex-col" action="/profile">
            <input
              placeholder="Full Name"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="name"
              name="fullname"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Feedback"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150 max-h-[15rem]"
              type="feeback"
              name="feedback"
              required
              onChange={(e) => setFeedback(e.target.value)}
            />

            <Button className="hidden lg:flex" onClick={HandleSubmit}>
              <button type="submit">Submit</button>
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;

import { useState } from "react";
import Button from "./Button";
import { GradientLight } from "./design/Benefits";
import Heading from "./Heading";
import Section from "./Section";
import Swal from "sweetalert2";
const PostEvents = () => {
  // State for form data
  const [eventData, setEventData] = useState({
    eventTitle: "",
    organizerName: "",
    eventLocation: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
    eventCategory: "",
    registrationLink: "",
    registrationDeadline: "",
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/event/postevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response) {
        var data = await response.json();
        if (data.message) {
          // Show success message using SweetAlert2
          Swal.fire({
            title: "Event Posted!",
            text: "Your event has been successfully posted.",
            icon: "success",
            confirmButtonText: "Great!",
            confirmButtonColor: "#3085d6",
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
          });

          // Reset form after successful submission
          setEventData({
            eventTitle: "",
            organizerName: "",
            eventLocation: "",
            eventDate: "",
            eventTime: "",
            eventDescription: "",
            eventCategory: "",
            registrationLink: "",
            registrationDeadline: "",
          });
        }
      }
    } catch (err) {
      setError(err.message);
      // Show error message using SweetAlert2
      Swal.fire({
        title: "Error!",
        text: "Failed to post event. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <div className="relative z-1 max-w-[50rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Post Event" />

          {/* Show error message if exists */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              value={eventData.eventTitle}
              onChange={handleInputChange}
              placeholder="Event Title"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="eventTitle"
              required
            />
            <input
              value={eventData.organizerName}
              onChange={handleInputChange}
              placeholder="Organizer Name"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="organizerName"
              required
            />
            <input
              value={eventData.eventLocation}
              onChange={handleInputChange}
              placeholder="Event Location"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="eventLocation"
              required
            />
            <div className="flex gap-4 mb-4">
              <input
                value={eventData.eventDate}
                onChange={handleInputChange}
                placeholder="Event Date"
                className="flex-1 bg-n-7 text-n-3 border-0 rounded-md p-2 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
                type="date"
                name="eventDate"
                required
              />
              <input
                value={eventData.eventTime}
                onChange={handleInputChange}
                placeholder="Event Time"
                className="flex-1 bg-n-7 text-n-3 border-0 rounded-md p-2 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
                type="time"
                name="eventTime"
                required
              />
            </div>
            <textarea
              value={eventData.eventDescription}
              onChange={handleInputChange}
              className="w-full h-32 p-2 bg-n-7 text-n-3 border-0 rounded-md mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150 resize-y"
              placeholder="Event Description"
              name="eventDescription"
              required
            ></textarea>
            <input
              value={eventData.eventCategory}
              onChange={handleInputChange}
              placeholder="Event Category"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="text"
              name="eventCategory"
              required
            />
            <input
              value={eventData.registrationLink}
              onChange={handleInputChange}
              placeholder="Registration Link"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="url"
              name="registrationLink"
              required
            />
            <input
              value={eventData.registrationDeadline}
              onChange={handleInputChange}
              placeholder="Registration Deadline"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="date"
              name="registrationDeadline"
              required
            />

            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default PostEvents;

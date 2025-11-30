import axios from "axios";
import Section from "./Section";
import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/v1/event/getEvent");
        let fetchedEvents = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        // Filter out events with a registration deadline older than one month
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        fetchedEvents = fetchedEvents.filter(
          (item) => new Date(item.registrationDeadline) > oneMonthAgo
        );

        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const BenefitCard = ({ item }) => {
    // Function to check if registration is still open
    const isRegistrationOpen = () => {
      const deadlineDate = new Date(item.registrationDeadline);
      return deadlineDate > new Date();
    };

    return (
      <a
        rel="noopener noreferrer"
        href={item.registrationLink}
        target="_blank"
        className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-n-7 hidden sm:block rounded-lg"
      >
        <div className="p-6 space-y-3">
          {/* Event Title */}
          <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline text-n-1">
            {item.eventTitle}
          </h3>

          {/* Organizer */}
          <div className="flex items-center gap-2 text-n-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-n-2">
              Organized by: {item.organizerName}
            </span>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-2 text-n-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-n-2">
              {new Date(item.eventDate).toLocaleDateString()} | {item.eventTime}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-n-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{item.eventLocation}</span>
          </div>

          {/* Description */}
          <p className="text-n-2 text-sm line-clamp-3">
            {item.eventDescription}
          </p>

          {/* Category */}
          <div className="pt-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-n-2 bg-n-6 rounded-full">
              {item.eventCategory}
            </span>
          </div>

          {/* Registration Deadline */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-n-2">
              Registration Deadline:{" "}
              {new Date(item.registrationDeadline).toLocaleDateString()}
            </div>
            <div
              className={`text-sm font-semibold ${
                isRegistrationOpen() ? "text-green-600" : "text-red-600"
              }`}
            >
              {isRegistrationOpen()
                ? "Registration Open"
                : "Registration Closed"}
            </div>
          </div>
        </div>
      </a>
    );
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Section>
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((item, index) => (
          <BenefitCard item={item} key={index} />
        ))}
      </div>
    </Section>
  );
};

export default Events;

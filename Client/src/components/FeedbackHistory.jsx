import { useEffect, useState } from "react";
import Section from "./Section";
import Heading from "./Heading";

const FeedbackHistory = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Improved data fetching with error handling
  useEffect(() => {
    const getFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/feedback/getfeedbacks`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getFeedbacks();
  }, []);

  // Sort function
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filter and sort feedbacks
  const filteredFeedbacks = feedbacks
    .filter((feedback) => {
      const searchString = searchQuery.toLowerCase();
      return (
        feedback.fullname?.toLowerCase().includes(searchString) ||
        feedback.email?.toLowerCase().includes(searchString) ||
        feedback.feedback?.toLowerCase().includes(searchString)
      );
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const direction = sortConfig.direction === "asc" ? 1 : -1;
      return a[sortConfig.key] > b[sortConfig.key] ? direction : -direction;
    });

  return (
    <Section>
      <Heading className="md:max-w-md lg:max-w-4xl" title="Feedbacks" />

      <div className="relative z-1 max-w-[90rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="px-8 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search feedbacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 p-2 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-n-5"
            />
          </div>

          {isLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-y-auto max-h-144">
              <table className="min-w-full bg-n-8 max-lg:h-90">
                <thead className="sticky top-0 bg-n-7">
                  <tr>
                    <th
                      onClick={() => handleSort("fullname")}
                      className="py-2 px-4 border-b-2 border-n-7 cursor-pointer hover:bg-n-6"
                    >
                      Name{" "}
                      {sortConfig.key === "fullname" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("email")}
                      className="py-2 px-4 border-b-2 border-n-7 cursor-pointer hover:bg-n-6"
                    >
                      Email{" "}
                      {sortConfig.key === "email" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("feedback")}
                      className="py-2 px-4 border-b-2 border-n-7 cursor-pointer hover:bg-n-6"
                    >
                      Message{" "}
                      {sortConfig.key === "feedback" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map((person) => (
                      <tr
                        key={person.id}
                        className="border-t border-gray-300 hover:bg-n-7 transition-colors duration-150"
                      >
                        <td className="py-3 px-4">{person.fullname}</td>
                        <td className="py-3 px-4">{person.email}</td>
                        <td className="py-3 px-4 text-left">
                          {person.feedback}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-8 text-center">
                        No feedbacks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default FeedbackHistory;

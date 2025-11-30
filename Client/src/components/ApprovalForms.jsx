import { useEffect, useState } from "react";
import Section from "./Section";
import Heading from "./Heading";

const ApprovalHistory = () => {
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Improved data fetching with error handling
  useEffect(() => {
    const getApprovals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/donate/getAllStudentForm`, {
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
        setApprovals(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getApprovals();
  }, []);

  // Filter feedbacks without sorting
  const filteredApprovals = Array.isArray(approvals)
    ? approvals.filter((approvals) => {
        const searchString = searchQuery.toLowerCase();
        return (
          approvals.fullName?.toLowerCase().includes(searchString) ||
          approvals.annualFee?.toLowerCase().includes(searchString) ||
          approvals.caste?.toLowerCase().includes(searchString)
        );
      })
    : []; // Default to an empty array if approvals is not an array

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
                    <th className="py-2 px-4 border-b-2 border-n-7">Name</th>
                    <th className="py-2 px-4 border-b-2 border-n-7">Email</th>
                    <th className="py-2 px-4 border-b-2 border-n-7">Caste</th>
                    <th className="py-2 px-4 border-b-2 border-n-7">
                      Annual Fees
                    </th>
                    <th className="py-2 px-4 border-b-2 border-n-7">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApprovals.length > 0 ? (
                    filteredApprovals.map((person) => (
                      <tr
                        key={person.id}
                        className="border-t border-gray-300 hover:bg-n-7 transition-colors duration-150"
                      >
                        <td className="py-3 px-4">{person.fullName}</td>
                        <td className="py-3 px-4">{person.email}</td>
                        <td className="py-3 px-4">{person.caste}</td>
                        <td className="py-3 px-4 text-left">
                          {person.annualFee}
                        </td>
                        <td className="py-3 px-4">{person.reason}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center">
                        No forms.
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

export default ApprovalHistory;

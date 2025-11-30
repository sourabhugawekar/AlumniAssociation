import { useState, useEffect } from "react";
import Section from "./Section";
import Heading from "./Heading";

const DonationHistory = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // sort Function
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  // Filter and sort feedbacks
  const filteredFeedbacks = fees
    .filter((feedback) => {
      const searchString = searchQuery.toLowerCase();
      return (
        feedback.studentName?.toLowerCase().includes(searchString) ||
        feedback.email?.toLowerCase().includes(searchString) ||
        feedback.feedback?.toLowerCase().includes(searchString)
      );
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const direction = sortConfig.direction === "asc" ? 1 : -1;
      return a[sortConfig.key] > b[sortConfig.key] ? direction : -direction;
    });

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch("/api/v1/donate/getHistory");
        const data = await response.json();
        console.log(data);
        setFees(data);
      } catch (error) {
        console.error("Error fetching fees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <Heading className="md:max-w-md lg:max-w-4xl" title="Donation History" />
      <div className="relative z-1 max-w-[90rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="mb-4">
          {/* <input
            type="text"
            placeholder="Search feedbacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 p-2 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-n-5"
          /> */}
        </div>
        <div className=" px-8 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm overflow-y-auto max-h-144">
          <div className="overflow-y-auto max-h-144">
            <table className="min-w-full bg-n-8 max-lg:h-90">
              <thead>
                <tr className="bg-n-7">
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Student Name
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Category
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Fees Amount
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Fees Paid Amount
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id} className="border-t border-gray-300">
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.studentName || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.category || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      ₹{fee.fees || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      ₹{fee.payFee || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.phoneNumber || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DonationHistory;

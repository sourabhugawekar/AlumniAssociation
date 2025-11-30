import { useState, useEffect } from "react";
import Section from "./Section";
import Heading from "./Heading";

const InfraHistory = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch("/api/v1/donate/getInfraHistory");
        const data = await response.json();
        console.log(data);
        console.log(data.infraFee);

        setFees(data.infraFee);
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
      <Heading
        className="md:max-w-md lg:max-w-4xl"
        title="Infrastructure Donation History"
      />
      <div className="relative z-1 max-w-[90rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className=" px-8 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm overflow-y-auto max-h-144">
          
          <div className="overflow-y-auto max-h-144">
            <table className="min-w-full bg-n-8 max-lg:h-90">
              <thead>
                <tr className="bg-n-7">
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Items
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 border-b text-left w-1/4 text-center">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id} className="border-t border-gray-300">
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.item || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.phoneNumber || ""}
                    </td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      {fee.quantity || ""}
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

export default InfraHistory;

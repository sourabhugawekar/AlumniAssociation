import { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import {useNavigate } from "react-router-dom";

const AlumniTable = () => {
  const [alumniDetails, setAlumniDetails] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getBlogsData = async () => {
      const response = await fetch(`/api/v1/alumni/alumnidetails`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const dataWithIds = data.map((alumni, index) => ({
          ...alumni,
          id: alumni._id || alumni.id || `alumni-${index}`,
        }));
        setAlumniDetails(dataWithIds);
      } else {
        console.error("Failed to fetch alumni details");
      }
    };

    getBlogsData();
  }, []);

  useEffect(() => {
    // Filter alumni based on search query and selected field
    const filtered = alumniDetails.filter((alumni) => {
      const fullName = `${alumni.fname} ${alumni.lname}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesField = selectedField
        ? alumni.field === selectedField
        : true;
      return matchesSearch && matchesField;
    });

    setFilteredAlumni(filtered);
  }, [searchQuery, selectedField, alumniDetails]);

  const handleSelectRow = (id) => {
    if (!id) return; // Guard clause for missing IDs

    setSelectedRows((prevSelectedRows) => {
      const isCurrentlySelected = prevSelectedRows.includes(id);
      if (isCurrentlySelected) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
      return [...prevSelectedRows, id];
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) =>
          fetch(`/api/v1/alumni/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
        )
      );

      setAlumniDetails((prev) =>
        prev.filter((alumni) => !selectedRows.includes(alumni.id))
      );
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to delete selected alumni:", error);
    }
  };

  const handleSendEmail = () => {
    setShowEmailModal(true);
  };
  const HandleEmailSender = () => {
    const emailList = alumniDetails
      .filter((alumni) =>
        selectedRows.includes(alumni.id || alumni._id)
      )
      .map((alumni) => alumni.email)
      .join(",");
    const emailArray = alumniDetails
    .filter((alumni) =>
      selectedRows.includes(alumni.id || alumni._id)
    )
    .map((alumni) => alumni.email);
    // .join(",");
    // window.location.href = `mailto:${emailList}`;
    console.log(emailList);
    console.log(emailArray);
    
    setShowEmailModal(false);
    navigate("/emailSender",{
      state:{
        emailArray,
      }
    });
  };
  return (
    <Section>
      <Heading className="md:max-w-md lg:max-w-4xl" title="Alumni Directory" />

      <div className="relative z-1 max-w-[90rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="px-8 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/3 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
            />

            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/3 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
            >
              <option value="">All Fields</option>
              {/* Replace these options with dynamic fields if available */}
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Artificial Intelligence and Machine Learning">
                Artificial Intelligence and Machine Learning
              </option>
              <option value="Electronics and Telecommunication">
                Electronics and Telecommunication
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>
          <div className="overflow-y-auto max-h-144 mb-16">
            <table className="min-w-full bg-n-8">
              <thead className="sticky top-0 bg-n-7">
                <tr>
                  <th className="py-2 px-4 border-b-2 border-n-7"></th>
                  <th className="py-2 px-4 border-b-2 border-n-7">Name</th>
                  <th className="py-2 px-4 border-b-2 border-n-7">
                    Year of admission
                  </th>
                  <th className="py-2 px-4 border-b-2 border-n-7">
                    Year of Graduation
                  </th>
                  <th className="py-2 px-4 border-b-2 border-n-7">Email</th>
                  <th className="py-2 px-4 border-b-2 border-n-7">Field</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map((person) => (
                    <tr
                      key={person.id || person._id}
                      className="border-t border-gray-300"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(
                            person.id || person._id
                          )}
                          onChange={() =>
                            handleSelectRow(person.id || person._id)
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                      <td className="py-3 px-4">
                        {person.fname + " " + person.lname}
                      </td>
                      <td className="py-3 px-4">{person.yearOfAdmission}</td>
                      <td className="py-3 px-4">{person.yearOfGraduation}</td>
                      <td className="py-3 px-4">{person.email}</td>
                      <td className="py-3 px-4">{person.field}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {selectedRows.length > 0 && (
            <div className="fixed bottom-8 right-8 flex gap-4 z-50">
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Email ({selectedRows.length})
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete Selected ({selectedRows.length})
              </button>
            </div>
          )}
        </div>
      </div>
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-n-8 p-6 rounded-lg max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              Send Email to Selected Alumni
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Recipients:
              </label>
              <div className="bg-n-7 p-2 rounded">
                {alumniDetails
                  .filter((alumni) =>
                    selectedRows.includes(alumni.id || alumni._id)
                  )
                  .map((alumni) => (
                    <span
                      key={alumni.id || alumni._id}
                      className="inline-block bg-blue-500 text-white rounded px-2 py-1 text-sm m-1"
                    >
                      {alumni.email}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-n-7 text-white rounded-md hover:bg-n-6 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={HandleEmailSender}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Compose Email
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default AlumniTable;

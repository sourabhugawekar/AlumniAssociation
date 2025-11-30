import { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

const StudentDirectory = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const navigate = useNavigate();
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/student/studentdetails`);
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudentDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    let filtered = studentDetails.filter((student) => {
      const fullName = `${student.fname} ${student.lname}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesField = selectedField
        ? student.field === selectedField
        : true;
      return matchesSearch && matchesField;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "name") {
          const nameA = `${a.fname} ${a.lname}`;
          const nameB = `${b.fname} ${b.lname}`;
          return sortConfig.direction === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }
        return sortConfig.direction === "asc"
          ? a[sortConfig.key] > b[sortConfig.key]
            ? 1
            : -1
          : b[sortConfig.key] > a[sortConfig.key]
          ? 1
          : -1;
      });
    }

    setFilteredStudent(filtered);
  }, [searchQuery, selectedField, studentDetails, sortConfig]);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudent.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const currentPageIds = currentStudents.map((student) => student.id);
      setSelectedStudents((prev) => {
        const otherPageSelections = prev.filter(
          (id) => !currentStudents.some((student) => student.id === id)
        );
        return [...otherPageSelections, ...currentPageIds];
      });
    } else {
      setSelectedStudents((prev) =>
        prev.filter(
          (id) => !currentStudents.some((student) => student.id === id)
        )
      );
    }
  };

  // const handleSelectStudent = (studentId) => {
  //   setSelectedStudents((prev) => {
  //     if (prev.includes(studentId)) {
  //       return prev.filter((id) => id !== studentId);
  //     } else {
  //       return [...prev, studentId];
  //     }
  //   });
  // };

  const handleSelectStudent = (id) => {
    if (!id) return; // Guard clause for missing IDs

    setSelectedStudents((prev) => {
      const isCurrentlySelected = prev.includes(id);
      if (isCurrentlySelected) {
        return prev.filter((rowId) => rowId !== id);
      }
      return [...prev, id];
    });
  };

  // const handleSelectStudent = (studentId) => {
  //   setSelectedStudents((prevSelected) =>
  //     prevSelected.includes(studentId)
  //       ? prevSelected.filter((id) => id !== studentId)
  //       : [...prevSelected, studentId]
  //   );
  // };

  useEffect(() => {
    const areAllCurrentSelected = currentStudents.every((student) =>
      selectedStudents.includes(student.id)
    );
    setSelectAll(areAllCurrentSelected && currentStudents.length > 0);
  }, [currentPage, selectedStudents, currentStudents]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete selected students?")) {
      try {
        const response = await fetch(`/api/v1/student/delete/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedStudents }),
        });
        console.log(response);
        if (response.ok) {
          setStudentDetails((prev) =>
            prev.filter((student) => !selectedStudents.includes(student.id))
          );
          setSelectedStudents([]);
          setSelectAll(false);
        } else {
          throw new Error("Failed to delete students");
        }
      } catch (error) {
        console.error("Error deleting students:", error);
        alert("Failed to delete students");
      }
    }
  };

  // const handleSendEmail = () => {
  //   const selectedEmails = studentDetails
  //     .filter((student) => selectedStudents.includes(student.id))
  //     .map((student) => student.email)
  //     .join(",");

  //   window.location.href = `mailto:${selectedEmails}`;
  // };
  const handleSendEmail = () => {
    setShowEmailModal(true);
  };


  const HandleEmailSender = () => {
    const emailList = studentDetails
      .filter((student) =>
        selectedStudents.includes(student.id || student._id)
      )
      .map((student) => student.email)
      .join(",");
    const emailArray = studentDetails
    .filter((student) =>
      selectedStudents.includes(student.id || student._id)
    )
    .map((student) => student.email);
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

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Section>
      <Heading className="md:max-w-md lg:max-w-4xl" title="Student Directory" />

      <div className="relative z-1 max-w-[90rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="px-8 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm overflow-y-auto max-h-144">
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

          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="overflow-y-auto max-h-144">
              <table className="min-w-full bg-n-8 max-lg:h-90 mb-20">
                <thead className="sticky top-0 bg-n-7">
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-n-7">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-n-6"
                      />
                    </th>
                    <th
                      className="py-2 px-4 border-b-2 border-n-7 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Name{" "}
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
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
                  {currentStudents.length > 0 ? (
                    currentStudents.map((person) => (
                      <tr key={person.id} className="border-t border-gray-300">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(
                              person.id || person._id
                            )}
                            onChange={() => handleSelectStudent(person.id || person._id)}
                            className="rounded border-n-6"
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

              <div className="flex justify-center gap-2 mt-4 mb-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-n-7 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredStudent.length / studentsPerPage)}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredStudent.length / studentsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage >=
                    Math.ceil(filteredStudent.length / studentsPerPage)
                  }
                  className="px-3 py-1 bg-n-7 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              {selectedStudents.length > 0 && (
                <div className="sticky bottom-8 right-8 flex justify-end gap-4">
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
                    Send Email ({selectedStudents.length})
                  </button>
                  <button
                    onClick={handleDelete}
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
                    Delete Selected ({selectedStudents.length})
                  </button>
                </div>
              )}
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
                {studentDetails
                  .filter((alumni) =>
                    selectedStudents.includes(alumni.id || alumni._id)
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

export default StudentDirectory;

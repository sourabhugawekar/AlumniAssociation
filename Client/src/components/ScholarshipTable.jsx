import axios from "axios";
import { useEffect, useState } from "react";

const ScholarshipTable = (props) => {
  const handleSelection = (person) => {
    props.onFeesSelect(person);
  };


  // const [alumni, setAlumni] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 3,
  //     name: "Michael Lee",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 4,
  //     name: "Emma Wilson",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 5,
  //     name: "Daniel Evans",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 6,
  //     name: "Sophia Martinez",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 7,
  //     name: "Liam Brown",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 8,
  //     name: "Olivia Davis",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 9,
  //     name: "Noah Johnson",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 10,
  //     name: "Ava Taylor",
  //     category: "Open",
  //     fees: 10000,
  //   },
  //   {
  //     id: 11,
  //     name: "Elijah Moore",
  //     category: "Open",
  //     fees: 10000,
  //   },
  // ]);

  const [alumni,setAlumni] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/donate/getAllStudentForm")
    .then(response => {
      console.log(response);
      setAlumni(response.data.StudentData);
    }).catch(err => console.log(err));
  },[]);

  // State to manage the search input and category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // Function to handle deleting a row
  // eslint-disable-next-line no-unused-vars
  const handleDelete = (id) => {
    setAlumni(alumni.filter((person) => person.id !== id));
  };

  // Filtered alumni based on search term and category
  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch = person.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    const matchesCategory = category === "" || person.category === category;
    return matchesSearch && matchesCategory;
  });

  // Get unique companies for the category filter
  const uniqueCategory = [...new Set(alumni.map((person) => person.category))];

  return (
    <div className="relative z-1 max-w-[80rem] mx-2 text-center mb-[1rem] md:mb-10 lg:mb-[6.25rem]">
      <div className=" px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-90 even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm overflow-y-auto max-h-50">
        {/* Search and Category Filter */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/3 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/3 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Companies</option>
            {uniqueCategory.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-y-auto max-h-60">
          <table className="min-w-full bg-n-8 max-lg:h-90">
            <thead className="sticky top-0 bg-n-7 w-full">
              <tr>
                <th className="py-2 px-4 border-b-2 border-n-7">Name</th>
                <th className="py-2 px-4 border-b-2 border-n-7">Category</th>
                <th className="py-2 px-7 border-b-2 border-n-7">Fees</th>
                <th className="py-2 px-7 border-b-2 border-n-7">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((person) => (
                  <tr key={person.id} className="border-t border-gray-300">
                    <td className="py-3 px-4">{person.fullName}</td>
                    <td className="py-3 px-4">{person.caste}</td>
                    <td className="py-3 px-4">{person.annualFee}</td>
                    <td className="py-3 px-4">
                      <a
                        onClick={() => handleSelection(person)}
                        className="bg-n-6 text-white px-3 py-1 rounded hover:bg-green-600 "
                      >
                        Select
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTable;

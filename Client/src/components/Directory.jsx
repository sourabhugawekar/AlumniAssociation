import React, { useState } from "react";
import Section from "./Section";

const Directory = () => {
  const [alumni, setAlumni] = useState([
    {
      id: 1,
      name: "John Doe",
      placedIn: "Google",
      year: 2020,
      contact: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      placedIn: "Microsoft",
      year: 2019,
      contact: "987-654-3210",
    },
    {
      id: 3,
      name: "Michael Lee",
      placedIn: "Facebook",
      year: 2021,
      contact: "456-789-1234",
    },
    {
      id: 4,
      name: "Emma Wilson",
      placedIn: "Amazon",
      year: 2022,
      contact: "654-321-9870",
    },
    {
      id: 5,
      name: "Daniel Evans",
      placedIn: "Netflix",
      year: 2018,
      contact: "234-567-8901",
    },
    {
      id: 6,
      name: "Sophia Martinez",
      placedIn: "Apple",
      year: 2020,
      contact: "321-654-9870",
    },
    {
      id: 7,
      name: "Liam Brown",
      placedIn: "Tesla",
      year: 2021,
      contact: "654-987-1234",
    },
    {
      id: 8,
      name: "Olivia Davis",
      placedIn: "Adobe",
      year: 2019,
      contact: "987-321-6540",
    },
    {
      id: 9,
      name: "Noah Johnson",
      placedIn: "Intel",
      year: 2020,
      contact: "432-987-6543",
    },
    {
      id: 10,
      name: "Ava Taylor",
      placedIn: "SpaceX",
      year: 2021,
      contact: "890-123-4567",
    },
    {
      id: 11,
      name: "Elijah Moore",
      placedIn: "IBM",
      year: 2018,
      contact: "321-789-4561",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleDelete = (id) => {
    setAlumni(alumni.filter((person) => person.id !== id));
  };

  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || person.placedIn === category;
    return matchesSearch && matchesCategory;
  });

  const uniqueCompanies = [...new Set(alumni.map((person) => person.placedIn))];

  return (
    <Section>
      <div className="relative z-1 max-w-[80rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className=" px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm overflow-y-auto max-h-144">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              className="border px-4 py-2 w-full md:w-1/2 lg:w-1/3"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border px-4 py-2 ml-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Companies</option>
              {uniqueCompanies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <table className="min-w-full min-h-full bg-n-8">
            <thead className="sticky top-(-14) bg-n-7 backdrop">
              <tr>
                <th className="py-2 px-4 border-b-2 border-n-9">Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Placed In
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Year of Graduation
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Contact Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((person) => (
                <tr key={person.id} className="border-t n-6">
                  <td className="py-3 px-4">{person.name}</td>
                  <td className="py-3 px-4">{person.placedIn}</td>
                  <td className="py-3 px-4">{person.year}</td>
                  <td className="py-3 px-4">{person.contact}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

export default Directory;

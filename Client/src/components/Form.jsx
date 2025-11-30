import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { GradientLight } from "./design/Benefits";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Form = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [yearOfAdmission, setYearOfAdmission] = useState("");
  const [yearOfGraduation, setYearOfGraduation] = useState("");
  const [field, setField] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const yearOfAdmissionNumber = parseInt(yearOfAdmission);
    const yearOfGraduationNumber = parseInt(yearOfGraduation);

    axios
      .post("/api/v1/user/signup", {
        fname,
        lname,
        email,
        password,
        gender,
        role,
        yearOfAdmission: yearOfAdmissionNumber,
        yearOfGraduation: yearOfGraduationNumber,
        field,
      })
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Registration successful! Please login to continue.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "bg-n-7 text-white",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text:
            err.response?.data?.message ||
            "Registration failed. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "bg-n-7 text-white",
          },
        });
      });
  };

  return (
    <Section>
      <div className="relative z-1 max-w-[45rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 lg:backdrop-blur-sm ">
          <Heading className="md:max-2-md lg:max-w-2xl" title="Register" />
          <form className="flex flex-col" onSubmit={HandleSubmit} action="post">
            <div className="flex space-x-4 mb-4">
              <input
                placeholder="First Name"
                className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/2 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
                type="text"
                name="fname"
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <input
                placeholder="Last Name"
                className="bg-n-7 text-n-3 border-0 rounded-md p-2 w-1/2 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
                type="text"
                name="lname"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>
            <input
              placeholder="Email"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="relative z-1 ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            <label
              className="text-sm mb-2 text-n-3 cursor-pointer"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label
              className="text-sm mb-2 text-n-3 cursor-pointer"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n-7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="admin"> Admin</option>
            </select>

            {/* Year of Admission and Graduation */}
            <div className="flex space-x-8 mb-6">
              <label
                className="text-sm mb-2 text-n-3 cursor-pointer"
                htmlFor="yearOfAdmission"
              >
                Year of Admission
              </label>
              <input
                className="bg-n-7 text-n-3 border-0 rounded-md p-2"
                id="yearOfAdmission"
                type="number"
                min="1900"
                max={new Date().getFullYear()} // Limit to the current year
                value={yearOfAdmission}
                onChange={(e) => setYearOfAdmission(e.target.value)}
                required
              />

              <label
                className="text-sm mb-2 text-n-3 cursor-pointer"
                htmlFor="yearOfGraduation"
              >
                Year of Graduation
              </label>
              <input
                className="bg-n-7 text-n-3 border-0 rounded-md p-2"
                id="yearOfGraduation"
                type="number"
                name="yearOfGraduation"
                min={yearOfAdmission} // Graduation cannot be earlier than admission
                max={
                  yearOfAdmission
                    ? parseInt(yearOfAdmission) + 4
                    : new Date().getFullYear()
                } // Admission year + 4 years
                value={yearOfGraduation}
                onChange={(e) => setYearOfGraduation(e.target.value)}
                required
              />
            </div>

            <label
              className="text-sm mb-2 text-n-3 cursor-pointer"
              htmlFor="field"
            >
              Field
            </label>
            <select
              className="bg-n-7 text-n-3 border-0 rounded-md p-2 mb-4 focus:bg-n=7 focus:outline-none focus:ring-1 focus:ring-n-5 transition ease-in-out duration-150"
              id="field"
              value={field}
              name="field"
              onChange={(e) => setField(e.target.value)}
            >
              <option value="">Select Field</option>
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

            <Button className="hidden lg:flex">
              <button type="submit">Register</button>
            </Button>
          </form>

          <p className="text-white mt-4">
            Already have an account?
            <Link
              className="text-sm text-blue-500 -200 hover:underline mt-4"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Form;

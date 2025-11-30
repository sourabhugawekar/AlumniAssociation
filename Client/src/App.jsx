import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./components/Form";
import Profile from "./components/Profile";
import AlumniTable from "./components/AlumniTable";
import AlumniDirectory from "./components/AlumniDirectory";
import AdminProfile from "./pages/AdminProfile";
import Donation from "./components/Donation";
import ProtectedRoute from "./components/ProtectedRoutes";
import StudentProfile from "./components/StudentProfile";
import Contact from "./components/Contact";
import Alumni from "./pages/Alumni";
import Student from "./pages/Student";
import Fees from "./components/Fees";
import JobPosting from "./components/JobPosting";
import ScholarshipForm from "./components/ScholarshipForm";
import Jobs from "./components/Jobs";
import FeedbackHistory from "./components/FeedbackHistory";
import StudentDirectory from "./components/StudentDirectory";
import Events from "./components/Events";
import PostEvents from "./components/PostEvents";
import StudentDetails from "./components/StudentDetails";
import DonationHistory from "./components/DonationHistory";
import EmailSender from "./components/EmailSender";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AboutUs from "./components/AboutUs";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Form />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/aboutus",
          element: <AboutUs />,
        },
        // {
        //   path:"/login",
        //   element: (
        //     <ProtectedRoute >
        //       <Login/>
        //     </ProtectedRoute>
        //   )
        // },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/alumni",
          element: <Alumni />,
        },
        {
          path: "/student",
          element: <Student />,
        },
        {
          path: "/fees",
          element: <Fees />,
        },
        {
          path: "/profile",
          element: (
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/alumnitable",
          element: (
            // <ProtectedRoute>
            <AlumniTable />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/alumnidirectory",
          element: (
            // <ProtectedRoute>
            <AlumniDirectory />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/adminprofile",
          element: (
            // <ProtectedRoute>
            <AdminProfile />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/donation",
          element: (
            // <ProtectedRoute>
            <Donation />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/scholarshipform",
          element: <ScholarshipForm />,
        },
        {
          path: "/student",
          element: <Student />,
        },
        {
          path: "/studentprofile",
          element: <StudentProfile />,
        },
        {
          path: "/jobposting",
          element: <JobPosting />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/feedbacks",
          element: <FeedbackHistory />,
        },
        {
          path: "/studentDirectory",
          element: <StudentDirectory />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/eventposting",
          element: <PostEvents />,
        },
        {
          path: "/studentDetails",
          element: <StudentDetails />,
        },
        {
          path: "/donationhistory",
          element: <DonationHistory />,
        },
        {
          path: "/emailSender",
          element: <EmailSender />,
        },
        {
          path: "/forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "/resetpassword/:token",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;

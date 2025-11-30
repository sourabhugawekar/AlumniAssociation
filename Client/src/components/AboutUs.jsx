import Section from "./Section";
import Heading from "./Heading";
import { GradientLight } from "./design/Benefits";

const AboutUs = () => {
  return (
    <Section>
      <div className="relative z-1 max-w-[65rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <GradientLight />
        <div className="bg-n-8 border border-n-6 rounded-[2rem] px-6 py-10 lg:px-16 lg:py-14 shadow-xl backdrop-blur-md">
          {/* Main Heading */}
          <Heading
            className="md:max-w-md lg:max-w-2xl mb-10"
            title="Welcome to the Alumni Association Platform"
          />
          {/* Introduction Section */}
          <div className="text-n-3 text-lg leading-relaxed mb-8">
            <p>
              Our Alumni Association Platform serves as a **bridge between the past, present, 
              and future** of our esteemed institution. With a focus on fostering lifelong connections, 
              empowering career growth, and celebrating achievements, we strive to bring alumni, 
              students, and the institution closer together.
            </p>
            <p className="mt-4">
              Whether you’re an alumnus eager to reconnect or a student seeking guidance and opportunities, 
              this platform is designed to meet your needs. Together, we aim to create a community that is 
              collaborative, inclusive, and innovative.
            </p>
          </div>

          {/* Key Features Section */}
          <div className="mt-10">
            <h2 className="text-white text-xl font-semibold mb-4">Our Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Event Management</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Alumni can organize events, and students can participate and network with professionals 
                  from diverse industries.
                </p>
              </div>
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Job Postings</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Access exclusive job opportunities shared by alumni and recruiters, tailored for both 
                  experienced professionals and fresh graduates.
                </p>
              </div>
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Donations & Scholarships</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Contribute to the development of the institution or support students financially through 
                  our transparent donation system.
                </p>
              </div>
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Alumni Directory</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Explore an extensive directory of alumni and students to build valuable connections and 
                  grow your network.
                </p>
              </div>
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Success Stories</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Get inspired by the remarkable achievements of our alumni and discover how they’re 
                  making a difference globally.
                </p>
              </div>
              <div className="bg-n-7 p-4 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Chat & Collaboration</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  Engage in meaningful conversations with alumni, students, and administrators via our 
                  interactive chat system.
                </p>
              </div>
            </div>
          </div>

          {/* Vision and Mission Section */}
          <div className="mt-12">
            <h2 className="text-white text-xl font-semibold mb-4">Our Vision & Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-n-7 p-6 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Vision</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  To create a global network of alumni and students who collaborate to drive personal 
                  and professional success, while contributing to the growth of the institution.
                </p>
              </div>
              <div className="bg-n-7 p-6 rounded-md">
                <h3 className="text-n-3 font-bold mb-2">Mission</h3>
                <p className="text-n-3 text-sm leading-relaxed">
                  To nurture a thriving community by providing cutting-edge tools, resources, and 
                  opportunities that enable meaningful connections and foster lifelong engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-14 text-center">
            <h2 className="text-white text-xl font-semibold mb-6">
              Ready to Join the Journey?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="/signup"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150"
              >
                Sign Up Now
              </a>
              <a
                href="/contact"
                className="bg-n-7 text-white px-6 py-3 rounded-md hover:bg-n-6 transition duration-150"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutUs;
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const AlumniStudentPosts = () => {
  const [jobPost, setJobPost] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getBlogsData = async () => {
      const response = await fetch(`/api/v1/job/getAllJobPosts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response) {
        var data = await response.json();
      }
      console.log(data[0]);
      console.log(data);
      setJobPost(data);
    };

    getBlogsData();
    console.log("jopost data", jobPost);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userPromises = jobPost.map((post) =>
          axios.get(`/api/v1/job/getuser/${post.user}`)
        );
        const responses = await Promise.all(userPromises);
        const userMap = {};
        responses.forEach((res, index) => {
          userMap[jobPost[index].user] = res.data;
        });
        setUsers(userMap);
        console.log(responses);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (jobPost.length > 0) {
      fetchUsers();
    }
  }, [jobPost]);

  return (
    <Section>
      <Heading title="Job Openings" />
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {jobPost
            .filter((post) => new Date(post.applicationDeadline) > new Date())
            .map((post) => (
              <div
                key={post._id}
                className="w-[2rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://thumbs.dreamstime.com/b/profile-pic-icon-isolated-white-background-your-web-mobile-app-design-133862807.jpg"
                    alt={post.author}
                    className="w-16 h-16 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-n-1">
                      {users[post.user]?.fname +
                        " " +
                        users[post.user]?.lname || "Loading..."}
                    </h3>
                    <span className="text-sm text-n-2">
                      {" "}
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-n-1">
                  Job title : {post.jobTitle}
                </h2>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Company Name</span> :{" "}
                  {post.companyName}
                </p>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Location :</span>{" "}
                  {post.jobLocation}
                </p>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Job Type :</span> {post.jobType}
                </p>

                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Job Description :</span>{" "}
                  {post.jobDescription}
                </p>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Skills required : </span>
                  {post.skillSet}
                </p>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Application Link : </span>
                  <a className="text-blue-500" href={post.applicationLink}>
                    {post.applicationLink}
                  </a>
                </p>
                <p className="text-n-2 mt-4">
                  <span className="text-n-1">Application Deadline : </span>
                  {new Date(post.applicationDeadline).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default AlumniStudentPosts;

import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  discordBlack,
  facebook,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  plusSquare,
  searchMd,
  telegram,
  twitter,
} from "../assets";
import network from "../assets/benefits/Network.jpg";
import donation from "../assets/benefits/Donation.jpg";
import event from "../assets/benefits/Events.jpg";
import success from "../assets/benefits/Success.svg";
import oppurtunity from "../assets/benefits/Oppurtunities.jpg";
import feedback from "../assets/benefits/Feedback.svg";

export const navigation = [
  {
    id: "0",
    title: "Events",
    url: "/benefit",
  },
  {
    id: "1",
    title: "Gallery",
    url: "/gallery",
  },
  {
    id: "2",
    title: "Contact",
    url: "/contact",
  },
  {
    id: "3",
    title: "About us",
    url: "/aboutus",
  },
  {
    id: "4",
    title: "New account",
    url: "signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const benefits = [
  {
    id: "0",
    title: "Join the Alumni Network",
    text: "Register to join our alumni community, update your profile, and stay connected with peers.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: network,
    linkUrl: "/login",
  },
  {
    id: "1",
    title: "Make a Donation",
    text: "Contribute to scholarships, research, and projects. Your donation makes a difference!",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: donation,
    light: true,
    linkUrl: "/login",
  },
  {
    id: "2",
    title: "Explore Career Opportunities",
    text: "Access job postings, connect with professionals, and explore new career opportunities.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: oppurtunity,
    linkUrl: "/login",
  },
  {
    id: "3",
    title: "View Student and  Alumni Details ",
    text: "Read about fellow alumni's achievements and let their stories motivate your journey.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: success,
    light: true,
    linkUrl: "/login",
  },
  {
    id: "4",
    title: "Stay Involved Through Events",
    text: "Register for alumni events and reunions to stay engaged and connected with your community.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: event,
    linkUrl: "/login",
  },
  {
    id: "5",
    title: "Provide Feedback",
    text: "Help us improve by sharing feedback and participating in surveys. Your voice matters!",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: feedback,
    linkUrl: "/login",
  },
];

export const AlumniFeatures = [
  {
    id: "0",
    title: "Join the Alumni Network",
    text: "Register to join our alumni community, update your profile, and stay connected with peers.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: network,
    linkUrl: "/alumnidirectory",
  },
  {
    id: "1",
    title: "Make a Donation",
    text: "Contribute to scholarships, research, and projects. Your donation makes a difference!",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: donation,
    light: true,
    linkUrl: "/donation",
  },
  {
    id: "2",
    title: "Explore Career Opportunities",
    text: "Access job postings, connect with professionals, and explore new career opportunities.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: oppurtunity,
    linkUrl: "/jobs",
  },
  {
    id: "3",
    title: "Post a Job Opportunity for Alumni and Students",
    text: "Share job opportunities with the alumni and student community. ",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: success,
    light: true,
    linkUrl: "/jobposting",
  },
  {
    id: "4",
    title: "Stay Involved Through Events",
    text: "Register for alumni events and reunions to stay engaged and connected with your community.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: event,
    linkUrl: "/events",
  },
  {
    id: "5",
    title: "Provide Feedback",
    text: "Help us improve by sharing feedback and participating in surveys. Your voice matters!",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: feedback,
    linkUrl: "/contact",
  },
];

export const StudentFeatures = [
  {
    id: "0",
    title: "View the Alumnis of College",
    text: "Register to join our alumni community, update your profile, and stay connected with peers.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: network,
    linkUrl: "/alumnidirectory",
  },
  {
    id: "1",
    title: "Scholarship/Grant Information",
    text: "Discover scholarships and grants from alumni and the college. Apply easily through the platform to support your studies.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: donation,
    light: true,
    linkUrl: "/scholarshipform",
  },
  {
    id: "2",
    title: "Explore Career Opportunities",
    text: "Access job postings, connect with professionals, and explore new career opportunities.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: oppurtunity,
    linkUrl: "/jobs",
  },
  {
    id: "3",
    title: "Student Directory",
    text: "View the directory of students of the college. ",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: success,
    light: true,

    linkUrl: "/studentDetails",
  },
  {
    id: "4",
    title: "Stay Involved Through Events",
    text: "Register for alumni events and reunions to stay engaged and connected with your community.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: event,
    linkUrl: "/events",
  },
  {
    id: "5",
    title: "Provide Feedback",
    text: "Help us improve by sharing feedback and participating in surveys. Your voice matters!",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: feedback,
    linkUrl: "/contact",
  },
];

export const AdminFeatures = [
  {
    id: "0",
    title: "Alumni Directory",
    text: "View the directory of alumni of the college.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    linkUrl: "/alumnitable",
  },
  {
    id: "1",
    title: "Student Directory",
    text: "View the directory of students of the college.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    light: true,
    linkUrl: "/studentDirectory",
  },
  {
    id: "2",
    title: "View job openings",
    text: "View job openings posted by the alumni and student community.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    linkUrl: "/jobs",
  },
  {
    id: "3",
    title: "Post job openings",
    text: "Share job opportunities with the alumni and student community. ",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    light: true,
    linkUrl: "/jobposting",
  },
  {
    id: "4",
    title: "Post events",
    text: "Organize and promote events for the alumni and student community.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    linkUrl: "/eventposting",
  },
  {
    id: "5",
    title: "Feedback History",
    text: "View feedbacks from the alumni and student community.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    linkUrl: "/feedbacks",
  },
  {
    id: "6",
    title: "Scholarship Forms",
    text: "View Scholarship Forms submmited by students for scholarship approval.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon2,
    linkUrl: "/approvalhistory",
  },
  {
    id: "7",
    title: "Donation History",
    text: "View Donation's history made by alumni and other community. ",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    linkUrl: "/donationhistory",
  },
  {
    id: "7",
    title: "Infrastructure Donation History",
    text: "View Donation's history made by alumni and other community. ",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    linkUrl: "/infrahistory", 
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

export const gallery = [
  {
    id: "0",
    title: "Cultural Fest 2023",
    text: "A vibrant celebration of culture and tradition.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon3,
    imageUrl: oppurtunity,
  },
  {
    id: "1",
    title: "Tech Symposium",
    text: "Showcasing innovation and cutting-edge technology.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
  },
  {
    id: "2",
    title: "Alumni Meet",
    text: "Reconnect with old friends and celebrate achievements.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
  },
  {
    id: "3",
    title: "Sports Day",
    text: "An exciting day of competition and teamwork.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
  },
  {
    id: "4",
    title: "Workshop on AI",
    text: "Exploring the future of Artificial Intelligence.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
  },
  {
    id: "5",
    title: "Graduation Ceremony",
    text: "Celebrating the achievements of our graduates.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
  },
];

export const form = [{ backgroundUrl: "./src/assets/benefits/card-1.svg" }];

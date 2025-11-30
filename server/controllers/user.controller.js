import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Alumni } from "../models/alumni.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { AlumniProfile } from "../models/alumniProfile.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { StudentProfile } from "../models/studentProfile.model.js";
import { sendMail } from "../utils/sendMail.util.js";

// import {sendCookie}  from "../utils/cookieparse.util.js";

const addDetailesInProfile = async (email, role) => {
  try {
    console.log("inside addDetails", email, role);
    if(role==="alumni"){

      AlumniProfile.create({
        email,
        bio: "Add bio",
        location: "Add location",
        phone: "Add Phone Number",
        skills: [],
        profilePhoto: "",
        backgroundImage: "",
        
      });
        
    }
    else if(role==="student") {
      StudentProfile.create({
        email,
        bio: "Add bio",
        location: "Add location",
        phone: "Add Phone Number",
        skills:[],
        profilePhoto: "",
        backgroundImage: "",
       
      });
        

    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
};

export const postRegister = async (req, res) => {
  console.log(req.body);
  const {
    fname,
    lname,
    email,
    password,
    gender,
    role,
    yearOfAdmission,
    yearOfGraduation,
    field,
  } = req.body;
  console.log(role);

  if (role === "alumni") {
    const user = await Alumni.findOne({ email });
    if (user) res.json({ status: false, message: "User is Already Exits " });
    const HashedPassword = await bcrypt.hash(password, 10);
    await Alumni.create({
      fname,
      lname,
      email,
      password: HashedPassword,
      gender,
      // role,
      yearOfAdmission,
      yearOfGraduation,
      field,
    });
    await addDetailesInProfile(email, role)
      .then((e) => res.json(e))
      .catch((err) => console.log(err));
  }

  if (role === "student") {
    const user = await Student.findOne({ email });
    if (user) {
      res.json({
        success:false,
        message:"User Already Exists !"
      })
    }
    const HashedPassword = await bcrypt.hash(password, 10);
    await Student.create({
      fname,
      lname,
      email,
      password: HashedPassword,
      gender,
      yearOfAdmission,
      yearOfGraduation,
      field,
    });
    await addDetailesInProfile(email, role)
    .then((e) => res.json(e))
    .catch((err) => console.log(err));
    
      
  }

  if (role === "admin") {
    const user = await Admin.findOne({ email });
    if (user) res.json({ status: false, message: "User is Already Exits " });
    const HashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      fname,
      lname,
      email,
      password: HashedPassword,
      gender,
    })
      .then((e) => res.json(e))
      .catch((err) => console.log(err));
  }

};

export let userMode = "";
export const postLogin = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email, password, role);
  userMode = role;
  // Alumni
  if (role === "alumni") {
    const user = await Alumni.findOne({ email }).select("+password");
    console.log(user);

    if (!user) {
      return res.status(400).json("User not Registered ");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false });
    }
    console.log("SuccessFully Login");
    // res.status(201).json('success');
    // sendCookie(user,res);

    const token = jwt.sign(
      {
        _id: user._id,
        role: role,
        email: email,
        fullName: user.fname + " " + user.lname,
      },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message: "alumni",
      token: token,
    });
  }
  // Student
  if (role === "student") {
    const user = await Student.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return res.status(400).json("User not Registered ");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false });
    }
    console.log("SuccessFully Login");
    // res.status(201).json('success');
    // sendCookie(user,res);

    const token = jwt.sign(
      {
        _id: user._id,
        role: role,
        email: email,
        fullName: user.fname + " " + user.lname,
      },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message: "student",
      token: token,
    });
  }

  // Admin
  if (role === "admin") {
    const user = await Admin.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return res.status(400).json("User not Registered ");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false });
    }
    console.log("SuccessFully Login");
    // res.status(201).json('success');
    // sendCookie(user,res);

    const token = jwt.sign(
      {
        _id: user._id,
        role: role,
        email: email,
        fullName: user.fname + " " + user.lname,
      },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message: "admin",
      token: token,
    });
  }
};

export const getLogout = async (req, res) => {
  console.log("At Function");
  res.clearCookie("token");
  // res.cookie('token','',{httpOnly:true,maxAge:0,path:'/'});

  console.log("At Function");

  return res.json({ status: true, message: "Logout " });
};

export const getProfile = async (req, res) => {
      console.log("In the get Profile Function ");
      const userId = req.user._id;
      const email = req.user.email;
      console.log(email);
      const loginUser = req.role;
      console.log(userId);
      console.log(loginUser);
      // console.log(userMode);
    if (loginUser === "alumni") {
    const alumni = await Alumni.findById(userId);
    console.log("Finding alumni", alumni);
    const alumniProfile = await AlumniProfile.findOne({ email });
    console.log("This is alumni details", alumniProfile);
    let skill = [];
    if(alumniProfile?.skills?.length > 0) {
      skill = alumniProfile.skills[0]?.split(",") || [];
    }
    if (alumniProfile) {
      const sendData = {
        name: alumni.fname + " " + alumni.lname,
        bio: alumniProfile.bio,
        location: alumniProfile.location,
        email: email,
        phone: alumniProfile.phone,
        skills: skill || [],
        profilePhoto: alumniProfile.profilePhoto,
        backgroundImage: alumniProfile.backgroundImage,
      };
      console.log("SendData Object", sendData);
      res.send(sendData);
    } 
  } else if (loginUser === "student") {
    const student = await Student.findById(userId);
    console.log("Finding student", student);
    const studentProfile = await StudentProfile.findOne({ email });
    console.log("This is student details", studentProfile);

    let skill = [];
    if(studentProfile?.skills?.length > 0) {
      skill = studentProfile.skills[0]?.split(",") || [];
    }

    if (studentProfile) {
      const sendData = {
        name: student.fname + " " + student.lname,
        bio: studentProfile.bio,
        location: studentProfile.location,
        email: email,
        phone: studentProfile.phone,
        skills: skill || [],
        profilePhoto: studentProfile.profilePhoto,
        backgroundImage: studentProfile.backgroundImage,
      };
      console.log("SendData Object", sendData);
      res.send(sendData);
    } 
  }
  
};
export const getUserProfile = async (req, res) => {
  console.log("In the get Profile Function ");
  console.log(req.query.email);
  console.log(req.query.role);
  console.log(req.query);
  const User = await AlumniProfile.find(req.query);
  console.log("User Deatils", User);
  return res.json(User);
};

export const putSetProfile = async (req, res) => {
  // const {formData,editing,profileInfo} = req.body;
  const userId = req.user._id;
  const loginUser = req.role;
  console.log(userId);
  console.log(loginUser);
  const email = req.user.email;
  console.log(email);
  const UserFind = await AlumniProfile.find({ email });
    const { name, bio, location, phone, skills } = req.body;
    console.log(name, bio, location, phone, skills);
    let profilePhotoUrl = UserFind ? UserFind.profilePhoto : "";
    let backgroundImageUrl = UserFind ? UserFind.backgroundImage : "";
    if (req.files && req.files["profilePhoto"] && req.files["profilePhoto"][0]) {
      console.log(req.files["profilePhoto"][0].path);
      const profilePhoto = await uploadOnCloudinary(
        req.files["profilePhoto"][0].path,
        "Alumni_Association/AlumniProfile/ProfilePhoto"
      );
    console.log(profilePhoto);
    console.log(profilePhoto.secure_url);
    profilePhotoUrl = profilePhoto.secure_url;
  }
  if (
    req.files &&
    req.files["backgroundImage"] &&
    req.files["backgroundImage"][0]
  ) {
    const backgroundImage = await uploadOnCloudinary(
      req.files["backgroundImage"][0].path,
      "Alumni_Association/AlumniProfile/backgroundImage"
    );
    console.log(backgroundImage);
    console.log(backgroundImage.secure_url);
    backgroundImageUrl = backgroundImage.secure_url;
  }
  console.log(name, bio, location, email, phone, skills);
  const receivedData = {
    email,
    bio,
    location,
    phone,
    skills,
    profilePhoto: profilePhotoUrl,
    backgroundImage: backgroundImageUrl,
  };
  if (UserFind) {
    await AlumniProfile.updateOne(
      { email },
      { $set: receivedData },
      { upsert: false }
    );
  } else {
    await AlumniProfile.create(receivedData);
  }
  // console.log(formData);
};
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    user.salt = undefined;
    user.secure_password = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: "You are not allowed to update this info",
    });
  }
};
export const putSetProfileStudent = async (req, res) => {
  // const {formData,editing,profileInfo} = req.body;
  const userId = req.user._id;
  const loginUser = req.role;
  console.log(userId);
  console.log(loginUser);
  const email = req.user.email;
  console.log(email);
  const UserFind = await StudentProfile.find({ email });

  // console.log(req.body);
  const { name, bio, location, phone, skills } = req.body;
  console.log(name, bio, location, phone, skills);

  // console.log(req.body);
  // console.log(name,email);
  // console.log(editing);
  // console.log(req.files);
  // console.log(req.files['profilePhoto'][0]);
  // upload.fields([{ name: "profilePhoto",maxCount:1}, { name: "backgroundImage" ,maxCount:1}]);
  let profilePhotoUrl = UserFind ? UserFind.profilePhoto : "";
  let backgroundImageUrl = UserFind ? UserFind.backgroundImage : "";
  if (req.files && req.files["profilePhoto"] && req.files["profilePhoto"][0]) {
    console.log(req.files["profilePhoto"][0].path);
    const profilePhoto = await uploadOnCloudinary(
      req.files["profilePhoto"][0].path,
      "Alumni_Association/StudentProfile/ProfilePhoto"
    );
    console.log(profilePhoto);
    console.log(profilePhoto.secure_url);
    profilePhotoUrl = profilePhoto.secure_url;
  }
  if (
    req.files &&
    req.files["backgroundImage"] &&
    req.files["backgroundImage"][0]
  ) {
    const backgroundImage = await uploadOnCloudinary(
      req.files["backgroundImage"][0].path,
      "Alumni_Association/StudentProfile/backgroundImage"
    );
    console.log(backgroundImage);
    console.log(backgroundImage.secure_url);
    backgroundImageUrl = backgroundImage.secure_url;
  }
  console.log(name, bio, location, email, phone, skills);
  const receivedData = {
    email,
    bio,
    location,
    phone,
    skills,
    profilePhoto: profilePhotoUrl,
    backgroundImage: backgroundImageUrl,
  };
  if (UserFind) {
    await StudentProfile.updateOne(
      { email },
      { $set: receivedData },
      { upsert: false }
    );
  } else {
    await StudentProfile.create(receivedData);
  }
  //  console.log(formData);
};

export const postForgotPassword = async (req,res) => {
  console.log(req.body);
  const {email,role} = req.body;
  try{
    if(role==="alumni") {
      const user = await Alumni.findOne({email});
      if(!user) {
          return res.status(404).json({
            success:false,
            message:'User Not Registered !'
          });
      }

      const token = jwt.sign({id:user._id,role:role},process.env.JWT_SECRET,{expiresIn:'10min'});
      console.log(token);

      const mailText = `${process.env.HOST_LINK}/resetPassword/${token}`;
       const response =  sendMail(email,"Reset Password",mailText,res);
       res.status(200).json({
        success:true,
        message:"Password Changed Mail has been sent !"

       })
       return response;

    }else if (role ==="student") {
      const user = await Student.findOne({email});
      if(!user) {
          return res.status(404).json({
            success:false,
            message:'User Not Registered !'
          });
      }

      const token = jwt.sign({id:user._id,role:role},process.env.JWT_SECRET,{expiresIn:'10min'});
      console.log(token);

      const mailText = `${process.env.HOST_LINK}/resetPassword/${token}`;
       const response =  sendMail(email,"Reset Password",mailText,res);
       res.status(200).json({
        success:true,
        message:"Password Changed Mail has been sent !"

       })
       return response;

    }else if (role ==="admin") {
      const user = await Admin.findOne({email});
      if(!user) {
          return res.status(404).json({
            success:false,
            message:'User Not Registered !'
          });
      }

      const token = jwt.sign({id:user._id,role:role},process.env.JWT_SECRET,{expiresIn:'10min'});
      console.log(token);

      const mailText = `${process.env.HOST_LINK}/resetPassword/${token}`;
       const response =  sendMail(email,"Reset Password",mailText,res);
       res.status(200).json({
        success:true,
        message:"Password Changed Mail has been sent !"

       })
       return response;

    }
  }catch(error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

export const postResetPassword = async (req,res) => {
  const token = req.params.token;
    const {reset} = req.body;
    console.log(token,reset);
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const id = decoded.id;
        const role = decoded.role;
        const hashedPassword = await bcrypt.hash(reset,10);
        if(role==='alumni') {
          await Alumni.findByIdAndUpdate({_id:id },{password: hashedPassword});
          return res.status(201).json({success: true,message:"Updated Password !"});
        }
        else if(role==='student') {
          await Student.findByIdAndUpdate({_id:id },{password: hashedPassword});
          return res.status(201).json({success: true,message:"Updated Password !"});
        }
        else if(role==='admin') {
          await Admin.findByIdAndUpdate({_id:id },{password: hashedPassword});
          return res.status(201).json({success: true,message:"Updated Password !"});
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({
          success:false,
          message:"Invalid Token"
        });
    }
}
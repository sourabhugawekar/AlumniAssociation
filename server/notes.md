
<!-- for the  -->

const handleEditToggle = (e) => {
    e.preventDefault();
    setEditing(!editing);
    const formData = new FormData();
    // console.log(profileInfo.profilePhoto);
    formData.append("profilePhoto", profileInfo.profilePhoto);
    formData.append("backgroundImage", profileInfo.backgroundImage);
    formData.append("name", profileInfo.name);
    formData.append("bio", profileInfo.bio);
    formData.append("location", profileInfo.location);
    formData.append("email", profileInfo.email);
    formData.append("phone", profileInfo.phone);
    formData.append("skills", JSON.stringify(profileInfo.skills));
    formData.append("editing", !editing);
    // console.log(formData);

    axios
      .post("/api/v1/user/setprofile", {formData,editing}, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


<!-- it is for the background and Profile Photo -->
   // New Functions for the profile and Background image 
  // Handle profile photo change
const handleProfilePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileInfo({ ...profileInfo, profilePhoto: file });
  }
};

// Handle background image change
const handleBackgroundImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileInfo({ ...profileInfo, backgroundImage: file });
  }
};


<!-- For the Email direction -->
 useEffect(() => {
    axios.get("/api/v1/user/profile").then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.email);

      setProfileInfo((prev) => ({
        ...prev,
        email: res.data.email,
        name: res.data.fname + " " + res.data.lname,
      }));
    });
  }, []);

  <!-- Auth Middleware  -->
  import { Alumni } from "../models/alumni.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { userMode } from "../controllers/user.controller.js";
export const isAuthenticated = async (req,res,next) => {

    const {token} = req.cookies;
    console.log('In the Authentication')
    if(!token) return res.status(404).json({
        success:false,
        message:"First Login"
    });

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    console.log(userMode);
    if(userMode==='alumni')  req.user = await Alumni.findById(decoded._id);
    else if (userMode==='student') req.user = await Student.findById(decoded._id);
    else if (userMode==='admin') req.user = await Admin.findById(decoded._id);

    console.log(req.user);
    console.log('Closed the Authentication Function')
    // console.log(req.user.email);

    
    next();
}

<!-- user Controllers  -->
export const postLogin = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email, password, role);
  userMode = role;
  // Alumni
  if (role === "alumni") {
    const user = await Alumni.findOne({email}).select("+password");
    console.log(user);

    if (!user) {
      return res.status(400).json("User not Registered ");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false});
    }
    console.log("SuccessFully Login");
    // res.status(201).json('success');
    // sendCookie(user,res);

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message: 'alumni',
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
      { _id: user._id },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message: 'student',
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
      { _id: user._id },
      process.env.JWT_SECRET, // process.env.KEY,
      { expiresIn: "1h" }
    );
    console.log("Token Generated", token);

    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    console.log("Cookie Generated ");

    return res.json({
      status: true,
      message:'admin',
      token: token,
    });

  }

};


<!-- Profile Controllers  -->
export const getProfile = async (req,res) => {
  console.log("In the get Profile Function ")
  const userId = req.user._id;
  console.log(userId);
  console.log(userMode);
   if(userMode==='alumni'){
     const alumni = await Alumni.findById(userId);
     console.log("Alumni Object ",alumni);
     
     res.send(alumni);
   }
   else if(userMode==='student'){
    const student = await Student.findById(userId);
    console.log("Student Object ",student);
    
    res.send(student);
  }
}

export const postSetProfile = async (req,res) => {
  // const {formData,editing,profileInfo} = req.body;
  
  console.log(req.body);
  // console.log(formData);
}

{
"_id":{"$oid":"672609d29814045c81cef508"},"email":"adityaumbhare@gmail.com","bio":"Add bio","location":"San Francisco, CA","phone":"+1 234 567 890","skills":["[\"React\",\"Node.js\",\"JavaScript\",\"Tailwind CSS\",\"MongoDB\"]"],"profilePhoto":"https://res.cloudinary.com/dbh5fbyv4/image/upload/v1730546132/Alumni_Association/AlumniProfile/ProfilePhoto/j0rxacrr5natlwacmfdt.png","backgroundImage":"https://res.cloudinary.com/dbh5fbyv4/image/upload/v1730546134/Alumni_Association/AlumniProfile/backgroundImage/dmgm4usagr4k8ylkjxen.jpg","createdAt":{"$date":{"$numberLong":"1730546130405"}},"updatedAt":{"$date":{"$numberLong":"1730546130405"}},"__v":{"$numberInt":"0"}}


{"_id":{"$oid":"672609d29814045c81cef508"},"email":"adityaumbhare@gmail.com","bio":"This is the updated images ","location":"San Francisco, CA","phone":"+1 234 567 890","skills":["[\"React\",\"Node.js\",\"JavaScript\",\"Tailwind CSS\",\"MongoDB\"]"],"profilePhoto":"https://res.cloudinary.com/dbh5fbyv4/image/upload/v1730548673/Alumni_Association/AlumniProfile/ProfilePhoto/rd8hpkrz17tjcoavtdxp.png","backgroundImage":"https://res.cloudinary.com/dbh5fbyv4/image/upload/v1730548674/Alumni_Association/AlumniProfile/backgroundImage/vprj2wzerzpw6qe5yl1z.png","createdAt":{"$date":{"$numberLong":"1730546130405"}},"updatedAt":{"$date":{"$numberLong":"1730548670811"}},"__v":{"$numberInt":"0"}}



<!-- // axios.get("/api/v1/user/profile").then(res => {
    //   console.log(res);
    //   console.log((res.data).length);
    //   console.log(res.data.email);
    //   if((res.data.isChanged)===true){
    //     setProfileInfo((prev) => ({
    //       name: res.data.name,
    //       bio:res.data.bio,
    //       location:res.data.location,
    //       email: res.data.email,
    //       phone:res.data.phone,
    //       skills:res.data.skills,
    //       profilePhoto:res.data.profilePhoto,
    //       backgroundImage:res.data.backgroundImage,
    //     }))  
    //   }
    //   else {
    //     setProfileInfo((prev) => ({
    //       ...prev,
    //       email: res.data.email,
    //       name: res.data.name,
    //     }))
    //   }
    // }) -->


    <!-- Cloudinary configs  -->
    cloudinary.config({
    cloud_name:'dbh5fbyv4',
    api_key:'965421342544566',
    api_secret:'iiKX5xXh4o6EJ0shxHbKSsuh4kc',

});
import { Alumni } from "../models/alumni.model.js";
import { AlumniProfile } from "../models/alumniProfile.model.js";
import { sendMail } from "../utils/sendMail.util.js";

export const getAllAlumniDetails = async (req, res, next) => {
  try {
    const alumnis = await Alumni.find();

    if (alumnis) {
      return res.status(200).json(alumnis);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO alumnis found in database",
    });
  }
};

export const postSendMail = async (req,res) => {
  try {
    console.log(req.body);
    const {email,subject,compose} = req.body;
    const response = await sendMail(email,subject,compose,res);
    res.status(200).json({
      success:true,
      message:"Email Send SuccessFully !"
    })
    return response;
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const deleteAlumniUser = async (req,res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await Alumni.findById({_id:userId});
      if(user) {
        console.log(user);
        const AlumniEmail = user.email;
        const alumniuser = await AlumniProfile.findOne({email:AlumniEmail});
        if(alumniuser){
          console.log(alumniuser);
          await alumniuser.deleteOne();
        }

      }
      await user.deleteOne();
    
    res.status(200).json({
      success:true,
      message:"Alumni Profiles  Deleted SuccessFully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
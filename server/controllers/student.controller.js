import { Student } from "../models/student.model.js";
import { StudentProfile } from "../models/studentProfile.model.js";

export const getAllStudentDetails = async (req, res, next) => {
  try {
    const students = await Student.find();

    if (students) {
      return res.status(200).json(students);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO Students found in database",
    });
  }
};

export const deleteStudentProfile = async (req,res) => {
  try {
    const {ids} = req.body;
    for(let i=0;i<ids.length;i++){
      const user = await Student.findById({_id:ids[i]});
      if(user) {
        console.log(user);
        const StudentEmail = user.email;
        const studentprofile = await StudentProfile.findOneAndDelete({email:StudentEmail});
        if(studentprofile.length > 0){
          console.log(studentprofile);
        }
       
      }
      await user.deleteOne();
    }
    res.status(200).json({
      success:true,
      message:"Student Profiles  Deleted SuccessFully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }

}
// import mongoose from "mongoose";
import { Infra } from "../models/infrastructure.model.js";
import { Fee } from "../models/fees.model.js";
import { Scholar } from "../models/scholarship.model.js";
export const postInfrastructure = async (req, res) => {
  const { phoneNumber, item, quantity } = req.body;

  await Infra.create({
    phoneNumber,
    item,
    quantity,
  });
  res.json("One Data Created !");
};

export const postFees = async (req, res) => {
  console.log("here");
  const { studentName, category, fees, payFee,phoneNumber } = req.body;

  // For the Testing purpose
  const userId = req.user;
  console.log(userId);
  // console.log(userId);
  console.log(req.params.id);
  // The above must be deleted

  console.log(studentName, category, fees, payFee,phoneNumber);
  await Fee.create({
    studentName,
    category,
    fees,
    payFee,
    phoneNumber,
  });
  res.json("One Data Created !");
};

export const getAllFeesDonations = async (req, res) => {
  try {
    const allFees = await Fee.find({});
    res.status(200).json(allFees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching fees donations", error: error.message });
  }
};

export const postStudentFeesForm = async (req,res) => {
  try{
    console.log(req.body);
    const userId = req.user._id;
    console.log(userId);
    const {fullName,email,caste,annualFee,reason} = req.body;
    console.log(fullName,email,caste,annualFee,reason);
    if(!fullName || !email || !caste || !annualFee || !reason){
      return res.status(400).json({
        success:false,
        message:"Provide all the neccessary details !"
      })  
    }

    const data = {
      fullName,
      email,
      caste,
      // annualFee :parseInt(annualFee),
      annualFee,
      reason,
      user:userId
    }

     await Scholar.create(data);
    return res.status(201).json({
      success:true,
      message:"Form Submitted Sucessfully !"
    })

  }catch(error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const getAllStudentFormDetails = async (req,res) => {
  try{
    const StudentData = await Scholar.find();
    return res.status(200).json({
      success:true,
      message:"Get All Data of Student !",
      StudentData
    })
  }catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }

}

export const getInfraFees = async (req,res) => {
  try {
    const infraFee = await Infra.find();
    return res.status(200).json({
      success:true,
      message:"Get All Infra Fees !",
      infraFee  
      });

    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

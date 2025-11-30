import { Alumni } from "../models/alumni.model.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req,res,next) => {

    const {token} = req.cookies;
    console.log('In the Authentication')
    if(!token) return res.status(404).json({
        success:false,
        message:"First Login"
    });

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    console.log(decoded.role);
    if(decoded.role==='alumni')  {
        req.user = await Alumni.findById(decoded._id);
        req.role = decoded.role;
    }
    else if (decoded.role==='student'){ 
        req.user = await Student.findById(decoded._id);
        req.role = decoded.role;
    }
    else if (decoded.role==='admin') req.user = await Admin.findById(decoded._id);

    console.log(req.user);
    console.log('Closed the Authentication Function')
    // console.log(req.user.email);

    
    next();
}
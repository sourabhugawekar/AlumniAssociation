import jwt from 'jsonwebtoken';
const JWT_SECRET = "skdjfdfnsdkfnsdkjfnsdfnsdfnsddfksad";


export const sendCookie = (user,res) => {
    const token = jwt.sign({_id:user._id},JWT_SECRET);
    console.log(token);
    res.cookie("token",token,{
        httpOnly:true,
        maxAge: 60*60*1000,
    });
};
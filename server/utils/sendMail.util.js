import nodemailer from "nodemailer";

export const sendMail = async (emailId, mailSubject, mailText, res) => {
  // transporter
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });
  // mailOptions Object
  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: emailId,
    subject: mailSubject,
    text: mailText,
  };
  console.log(mailOptions);
  // main Function

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("The Error is ", error);
      return res.json({ message: "Error Sending Mail !" });
    } else {
      console.log("Email sent : " + info.response);
      return res.json({ status: true, message: "Email Sent" });
    }
  });
};

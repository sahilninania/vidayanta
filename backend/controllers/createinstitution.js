import bcrypt from "bcryptjs";
import Institution from "../models/institutionmodel.js";
import User from "../models/usermodel.js";
import Counter from "../models/contermodel.js";
import generateUsername from "../utils/generateusername.js";
import generatePassword from "../utils/generatepassword.js";
// import sendEmail from "../utils/sendemail.js";
import emailQueue from "../queue/emailqueue.js";
const createInstitution = async(req,res)=>{
    try{
        // console.log(req.body);
        const {institutionName, branch, email, mobile, address} = req.body;
        if(!institutionName || !branch || branch < 1 || !email || String(mobile).length !==10 || !address){
            return res.status(400).json({message:"all fields are required"})
        }
        if(String(mobile).length !=10){
             return res.status(400).json({message:"error found in moblie number"})
        }
        const institutionCounter = await Counter.findOneAndUpdate(
        { name: "institutionCode" },
        { $inc: { value: 1 } },
        { returnDocument: "after", upsert: true }
        );
        const institutionCode = String(institutionCounter.value).padStart(4, "0");
        const username = await generateUsername("instituteadmin", institutionCode, branch);       
        const plainPassword =  generatePassword();
        const hashedPassword = await bcrypt.hash(plainPassword,10); 
        const user = await User.create({
            username,
            password:hashedPassword,
            role:"instituteadmin",
            institutionCode,
             branch,
             email,
        });
        await Institution.create({
            institutionName,
            institutionCode,
            branch,
            email,
            mobile,
            address,
            userId:user._id
        });
        try{
           await emailQueue.add({
            type: "CREDENTIALS",
            email,
            data: {
                name: institutionName,
                username,
                password: plainPassword,
            },
            });
        }catch(error){
            // console.log("Email failed");
        }
        // console.log(institutionName, branch, email, mobile, address, institutionCode, username, plainPassword);
        return res.status(201).json({
            success:true,
            message:"institution created successfully",
            username,
            // password:plainPassword,
        });
    }catch(error){
        return res.status(500).json({success:false,message:`institution sign up error ${error.message}`})
    }
};

export default createInstitution;
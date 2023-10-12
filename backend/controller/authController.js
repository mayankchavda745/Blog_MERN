 import bcryptjs from 'bcryptjs'
 import authModel from "../models/authModel.js"
 import jwt from "jsonwebtoken"
 
 class AuthController {
    static userRegistration = async (req,res) => {
      try {
         const {username, email, password} = req.body;
         if(username && password && email){
            const isUser = await authModel.findOne({email});
            if(!isUser){
               //password hashing
               const genSalt = await bcryptjs.genSalt(10);
               const hashedPassword = await bcryptjs.hash(password,genSalt);
               //save a user
               const newUser = new authModel({username,email,password:hashedPassword})
               const saveUser = await newUser.save();
               if(saveUser){
                  return res.status(200).send({message:"User Registration successfully"});
               }else{
                 throw({message:"Error while creating the user..."});  
               }
            }else{
               throw({message:"Email already exists"});
            }
         }else{
            throw({message:"all fields are required"});
         }
      } catch (error) {
         return res.status(400).send({message:error.message});
      }
   };
    static userLogin = async (req,res) => {
      try {
         const {email,password} = req.body;
         if(email && password){
            const isEmail = await authModel.findOne({email});
            if(isEmail){
               if(isEmail.email === email && (await bcryptjs.compare(password, isEmail.password))){
                  //generate token
                  const token = jwt.sign({userIDL:isEmail._id},"pleaseSubscribe",{expiresIn:"2D"});
                  return res.status(200).send({
                     message:"Login Successfully",
                     token,name:isEmail.username
                  })
               }else{
                  throw({message:"wrong credentials..."});
               }
            }else{
               throw({message:"Email id not found..."});
            }
         }else{
            throw({message:"All field are required..."});
         }
      } catch (error) {
         return res.status(400).send({message:error.message});
      }
    };
 }
 
 export default AuthController;
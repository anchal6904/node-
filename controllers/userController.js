import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt,{hash} from 'bcrypt'




class userController{
    static userRegistration=async(req,res)=>{
        const {name,email,password,confirm_pass,tc}=req.body;
        const user=await userModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"User already exists"})
        }
        else{
            if(name && email && password && confirm_pass && tc){
                if(password===confirm_pass){
                    try{
                        const salt=await bcrypt.genSalt(10);
                        const hashedpass=await bcrypt.hash(password,salt);
                        const doc=new userModel({
                            name,
                            email,
                            password:hashedpass,
                            tc
                        })
                        await doc.save();
                        const saved_user=await userModel.findOne({email:email})
                        
                        
                        res.status(201).send({"status":"success",message:"User registered successfully"})
                    }
                    catch(err){
                        res.send({"status":"failed","message":"Unable to register user"})
                        console.log(err)
                    }
                }
                else{
                    res.status(400).send({"status":"failed","message":"Password and confirm password does not match"})
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
        
    }
    static userLogin=async(req,res)=>{
        try{
            const {email,password}=req.body;
            if(email && password){
                const user=await userModel.findOne({email:email});
                if(user){
                    const isMatch=await bcrypt.compare(password,user.password);
                    if(isMatch && user.email===email){
                        const token=jwt.sign({user_id:user._id},process.env.SECRET_KEY,{expiresIn:'5d'})
                        console.log(token)
                        res.send({status:"success",message:"User logged in successfully",token:token})
                    }
                    else{
                        res.send({"status":"failed","message":"Invalid email and password"})
                    }
                }
                else{
                    res.send({"status":"failed","message":"User not found"})
                }
    
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
        catch(err){
            res.send({"status":"failed","message":"Unable to login user"})
        }
    }
    static changePassword=async(req,res)=>{
        const {password,confirm_pass}=req.body;
        if(password && confirm_pass){
            if(password===confirm_pass){
                const salt=await bcrypt.genSalt(10);
                const hashedpass=await bcrypt.hash(password,salt);
                const user=await userModel.findByIdAndUpdate(req.user._id,{$set:{password:hashedpass}},{new:true})
                if(user){
                    res.send({"status":"success","message":"Password changed successfully","token":token})
                }
                else{
                    res.send({"status":"failed","message":"Unable to change password"})
                }
            }
            else{
                res.send({"status":"failed","message":"Password and confirm password does not match"})
            }
        }
        else{
            res.send({"status":"failed","message":"All fields are required"})
        }
    }
    
    
}
export default userController
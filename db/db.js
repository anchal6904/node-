
import mongoose from 'mongoose'

const mongodb=async(mongoURL)=>{
    mongoose.connect(mongoURL)
    const db= await mongoose.connection;

    db.on('connected',()=>{
        console.log("Connected to mongoDB server")
    })
    db.on('error',()=>{
        console.log("mongoDB server error",error)
    });
    db.on('disconnected',()=>{
        console.log("mongoDB server disconnected")
    })
}
export default mongodb
    



const dbPassWord="NvdilfchrJPTqHcL";
const dbUserName ="diasa72342"
const connectionUrl= "mongodb+srv://diasa72342:NvdilfchrJPTqHcL@cluster0.fgbfa.mongodb.net"

const mongoose = require("mongoose")

const connectDb = async ()=>{
    try{
        const mongodbIntance = await mongoose.connect(connectionUrl);
        console.log(`Mongodb connection successfull ${mongodbIntance.connection.host}`);
    }catch(error){
        console.error(error)
    }
}
module.exports = {connectDb};
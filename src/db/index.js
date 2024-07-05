import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";



const connectionDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb Connected !! DB HOST: ${connectionInstance.connection.host}`)
    }catch(error){
        console.log(`Connection ERROR`, error);
        process.exit
    }
}

export default connectionDB
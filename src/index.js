import dotenv from "dotenv";

import connectionDB from "./db/index.js";
import { DB_NAME } from "./constant.js";




dotenv.config({
    path: "./.env",
})

 connectionDB()
// console.log(process.env.MONGODB_URL);
// console.log(DB_NAME); 
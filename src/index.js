import dotenv from "dotenv";

import connectionDB from "./db/index.js";
import { DB_NAME } from "./constant.js";




dotenv.config({
    path: "./.env",
})

 connectionDB()
.then(() => {
    app.on("error" , (error) => {
        console.log("Error: ", error);
        throw error
    })
    
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed! : ", error);
})
import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser) //USE OF COOKIE-PARSER


export {app}


import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true
        },

        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar: {
            type: String,
            required: true
        },

        coverImage: {
            type: String,
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true , "Password is required!"],
        },

        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next();/*IF THE PASSWORD IS NOT CHANGED THEN FUNCTION CALLS next() . 
    DOES NOT NEED TO HASH AN ALREADY HASHED PASSWORD */

    this.password = await bcrypt.hash(this.password , 7)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.comapre(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)


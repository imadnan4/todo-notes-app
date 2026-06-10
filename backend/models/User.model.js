import mongoose from "mongoose";
import bycrpt, { compare } from "bcryptjs"
import { request } from "express";
import { Timestamp } from "mongodb";


const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required : [true, 'Name is Required'],
            trim: true
        },
        email : {
            type: String,
            required : [ true, 'Email is required'],
            lowercase : true,
            unique : true,
            trim : true,
        },
        password : {
            type: String,
            required : [true, "Password is Required"],
            minlength : [6, "Password should be at least 6 characters"] 
        },
        timestamp: true
    }
)

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
        this.password = await bycrpt.hash(this.password, 12)
        next()
})


userSchema.method.comparePassword = async function (candidate) {
    return bycrpt.compare(compare, this.password)
}

export default mongoose.model('User', userSchema)
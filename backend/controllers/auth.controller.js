import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'


const signToken = (id) => 
    jwt.sign(
        {id},
        process.env.JWT_SECRETS,
        {expiresIn : '7d'}
    )


    // POST /api/auth/register
    export const register = async (req, res , next) => {
        try{
            const { name , email, password} = req.body

            const existing = await User.findOne({email})

            if (existing){
                return res.status(400).json({message : "User already exist"})
            }

            const user = await User.create({name, email, password})
            const token = signToken(user._id)

            res.status(201).json({
                token, 
                user : {id: user._id, name : user.name, email: user.email}
            })
        } catch(error){
            next(error)
        }
    }



    //POST /api/auth/login 
    export const login = async (req, res, next) =>{

        try{
        const { email, password } = req.body



        const user = await User.findOne({email})
        if(!user || (!await user.comparePassword(password))){
           return res.status(401).json({message : "Invalid email or password"})
        }

        const token = signToken(user._id)
        res.json({
            token, 
            user : {id: user._id, name: user.name, email: user.email}
        })
    } catch(error){
        next(error)
    }}
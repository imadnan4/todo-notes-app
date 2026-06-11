import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'



export const protect = async (req, res , next) => {
    try{
         // Step 1 + 2: get and extract token
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message : 'Not Authorized, no tokens'})
        }
        const tokens = authHeader.split(' ')[1]


        // Step 3 + 4: verify and decode
        const decoded = jwt.verify(tokens, process.env.JWT_SECRET)

        // Step 5: fetch user from DB (ensures user still exists)
        const user = await User.findById(decoded.id)
        if(!user) return res.status(401).json({message : "User no longer exist."})

        // Step 6 + 7: attach and continue
        req.user = user
        next()
    }catch (error){
        return res.status(401).json({message : "invalid or expired tokens"})
    }
}
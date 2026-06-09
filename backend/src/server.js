import app from './app.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js'  


// Load Environment Variables
dotenv.config();


// connect to database
connectDB()

const PORT = process.env.PORT || 5000



// Start the server listener
app.listen(PORT, () =>{
    console.log(`Server Running on PORT ${PORT}`)
})







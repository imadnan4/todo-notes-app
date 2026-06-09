import express from 'express';
import cors from 'cors'


// initalize express app
const app = express();


// MiddleWare
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get('/api/health',(req, res) =>{
    res.status(200).json({
        status: 'ok',
        timestamp : new Date().toISOString(),
        uptime: process.uptime()
    })
})

// Global Error Handler

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({ error : 'something went wrong!'})
})


export default app

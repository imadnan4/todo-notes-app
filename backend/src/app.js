import express from 'express';
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from '../routes/auth.routes.js'
import notesRoutes from '../routes/notes.routes.js'
import errorHandler from '../middleware/error.middleware.js'


// initalize express app
const app = express();


// MiddleWare
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)



// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'something went wrong!' })
})


export default app

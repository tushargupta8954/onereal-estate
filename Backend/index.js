import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config(); // ✅ Simple - reads .env from current folder

const app = express();
app.use(express.json());

// Routes ✅ before listen
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Error Handler ✅
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
    });
});

// Connect to MongoDB then Start Server ✅
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
    });
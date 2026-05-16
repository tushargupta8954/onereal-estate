import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config({ path: './Backend/.env' });

console.log("ENV VALUE:", process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
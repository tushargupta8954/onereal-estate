import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';  // ✅ import bcrypt

export const signup = async (req, res, next) => {  // ✅ added async
    try {
        const { username, email, password } = req.body;
        
        const hashedPassword = bcrypt.hashSync(password, 10);  // ✅ inside try
        
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        });
        
        await newUser.save();  // ✅ now works
        
        res.status(201).json({ 
            success: true,
            message: 'User created successfully' 
        });

    } catch (error) {
        next(error);  // ✅ catches all errors
    }
};
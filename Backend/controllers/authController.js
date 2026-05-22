import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';  // ✅ import bcrypt
import jwt from 'jsonwebtoken';  

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

export const signin = async (req, res, next) => {  
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });  // ✅ find user by email
        if (!validUser) return next(errorHandler(404, 'User not found'));  
        const validPassword = bcrypt.compareSync(password, validUser.password);  // ✅ compare passwords
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });  
        const { password: pass, ...rest} = validUser._doc;   // ✅ exclude password from response
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);  // ✅ set cookie and send user data
        
    } catch (error) {
        next(error);
    }
};

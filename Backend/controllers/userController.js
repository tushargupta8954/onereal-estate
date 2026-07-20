import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listingModel.js';
export const test = (req, res) => {
    res.json({
        message: 'Api routes is working fine',
    });
};

export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can update only your account'));  
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateFields = {};
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.password) updateFields.password = req.body.password;
        if (req.body.avatar) updateFields.avatar = req.body.avatar;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateFields
        }, { new: true });

        if (!updatedUser) return next(errorHandler(404, 'User not found'));

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can delete only your account'));  
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return next(errorHandler(404, 'User not found'));
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
  if(req.user.id === req.params.id) {
    try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
    } catch (error) {
        next(error)
    }
    } else {
    return next(errorHandler(401, 'You can only access your listings'));
  } 
  
  
}

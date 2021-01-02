import mongoose from 'mongoose';
import User from '../models/user.js';

// SEE ALL STATUS CODES HERE: https://www.restapitutorial.com/httpstatuscodes.html

// @route
// @desc
// @access
export const getUsers = async (req, res) => {
    try {
        // Find all objecs that follows/fits the User model
        const users = await User.find(); 

        // Return status 200 (Ok), and .json array of found user object in database to front-end
        res.status(200).json(users); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// @route   POST users
// @desc    Create A User
// @access  Public
export const createUser = async (req, res) => {
    const user = req.body; // Info from form sent from front-end
    
    const newUser = new User(user); // Transform received front-end user info to a User Mongoose Model/Schema

    try {
        await newUser.save(); // Saving to DB
        res.status(201).json(newUser); // Responding with 201 => successful creation, And the newly built object
    } catch (error) {
        res.status(409).json({ message: error.message }); // 409 => Conflict
    }
}

// @route   POST users/:id
// @desc
// @access
export const updateUser = async (req, res) => {
    const { id: _id } = req.params; // request looks like "users/123". That 123 (the id) will fill id
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')
    

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.json(updatedUser);
}

// @route   DELETE users/:id
// @desc    Delete a user
// @access  
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

    await User.findByIdAndRemove(id);

    res.json({ message: 'User deleted successfully' });
}




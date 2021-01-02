import mongoose from 'mongoose';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// SEE ALL STATUS CODES HERE: https://www.restapitutorial.com/httpstatuscodes.html

// @route   GET Users
// @desc    Get All Users
// @access  Public
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

// @route   POST users/register
// @desc    Register A User
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { email, password, passwordCheck, firstName, lastName, userType } = req.body;

        // Validation

        if (!email || !password || !passwordCheck || !firstName || !lastName || !userType) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Enter the same password twice for verification." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt(); // used to generate the hash
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
            userType,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @route   POST users/login
// @desc    Login A User
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @route   POST users/:id
// @desc    Update User Info
// @access  Private  **Add Auth**
export const updateUser = async (req, res) => {
    const { id: _id } = req.params; // request looks like "users/123". That 123 (the id) will fill id
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')
    

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.json(updatedUser);
}

// @route   DELETE users/:id
// @desc    Delete a user
// @access  Private  **Add Auth**
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

    await User.findByIdAndRemove(id);

    res.json({ message: 'User deleted successfully' });
}




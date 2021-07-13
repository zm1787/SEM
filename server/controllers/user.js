import mongoose from 'mongoose';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { isOldEnough } from './helperFunctions.js';

// SEE ALL STATUS CODES HERE: https://www.restapitutorial.com/httpstatuscodes.html


// @route   GET users/load
// @desc    Return User Info
// @access  Auth only
export const loadProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password -dateOfBirth -createdAt');
        if (!user) throw Error('User does not exist');
        res.json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


// @route   POST users/registerSeeker
// @desc    Register A Seeker
// @access  Public
export const registerSeeker = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, country, subdivision, city, email, password, passwordCheck, policyChecked } = req.body;
        // Validation
        if (!firstName || !lastName || !dateOfBirth || !country || !subdivision || !city || !email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Please make sure all fields have been correctly filled before signing up." });
        }
        if (!isOldEnough(dateOfBirth)) {
            return res.status(400).json({ msg: "Must be between the ages of 18 and 125." });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long. Please try a new password." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Password verification does not match. Please try again." });
        }
        if (!policyChecked) {
            return res.status(400).json({ msg: "Please read and agree to the Terms of Service." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }
        const salt = await bcrypt.genSalt(); // used to generate the hash
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: email.toLowerCase(),
            password: passwordHash,
            firstName,
            lastName,
            dateOfBirth,
            location: {
                country,
                province: subdivision,
                city,
            },
            userType: "Seeker"
        });
        let savedUser = await newUser.save();
        savedUser.password = undefined;

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: savedUser,
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// @route   POST users/login
// @desc    Login A User
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!password && !email) {
            return res.status(400).json({ msg: "Please enter your credentials in the fields above to log in." });
        }
        if (!password) {
            return res.status(400).json({ msg: "Please enter a password." });
        }
        if (!email) {
            return res.status(400).json({ msg: "Please enter an email address." });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials. Please try again." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = undefined;

        //await sleep(1000);
        res.json({
            token,
            user,
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// @route   POST users/:id
// @desc    Update User Info
// @access  Auth only
export const updateUser = async (req, res) => {
    const { id: _id } = req.params; // request looks like "users/123". That 123 (the id) will fill id
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id')

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

    res.json(updatedUser);
}

// @route   DELETE users/:id
// @desc    Delete a user
// @access  Auth only
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

    await User.findByIdAndRemove(id);

    res.json({ msg: 'User deleted successfully' });
}




import mongoose from 'mongoose';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { isOldEnough } from './helperFunctions.js';

// SEE ALL STATUS CODES HERE: https://www.restapitutorial.com/httpstatuscodes.html

// @state   Working
// @route   GET users/load
// @desc    Get User Info
// @access  Auth only
export const loadUser = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('email firstName lastName profession'); // req.user is the user id set by auth.js
        if (!user) throw Error('User does not exist');
        res.json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// @route   users
// @desc    Get All Users
// @access  Public
export const getUsers = async (req, res) => {
    try {
        // Find all objecs that follows/fits the User model
        const users = await User.find().select('email firstName lastName userType profession dateOfBirth location');

        // Return status 200 (Ok), and .json array of found user object in database to front-end
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// @route   POST users/registerSeeker
// @desc    Register A Seeker
// @access  Public
export const registerSeeker = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, country, province, city, email, password, passwordCheck, policyChecked } = req.body;
        console.log("test");
        // Validation
        if (!firstName || !lastName || !dateOfBirth || !country || !province || !city || !email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (!isOldEnough(dateOfBirth)) {
            return res.status(400).json({ msg: "Age must be between 18 and 125" });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Please verify that the same password was entered twice for verification." });
        }
        if (!policyChecked) {
            return res.status(400).json({ msg: "Please agree to the Terms of Service" });
        }
        console.log("test2");

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }
        console.log("test3");
        const salt = await bcrypt.genSalt(); // used to generate the hash
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("test4");
        const newUser = new User({
            email,
            password: passwordHash,
            firstName,
            lastName,
            dateOfBirth,
            location: {
                country,
                province,
                city,
            },
            userType: "Seeker"
        });
        console.log("test5");
        let savedUser = await newUser.save();
        console.log("test6");
        savedUser.password = undefined;
        res.json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// @route   POST users/register/specialist
// @desc    Register A Specialist
// @access  Public
export const registerSpecialist = async (req, res) => {
    try {
        const { email, password, passwordCheck, firstName, lastName, userType, profession } = req.body;

        // Validation
        if (!email || !password || !passwordCheck || !firstName || !lastName /*|| !userType*/) {
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
            profession
        });
        let savedUser = await newUser.save();
        savedUser.password = undefined;
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

    res.json({ message: 'User deleted successfully' });
}




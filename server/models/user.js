import mongoose from 'mongoose';
import { businessSchema as Business } from './business.js';

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required: true
    },

    lastName: {
        type : String,
        required: true
    },

    email: {
        type: String, 
        required: true,
        unique: true
    },

    password: {
        type: String, 
        required: true,
    },

    location: {
        country: {
            type: String, 
            required: true,
        },
        province: {
            type: String, 
            required: true,
        },
        city: {
            type: String, 
            required: true,
        },
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },

    // userType: Specialist(bronze, silver, gold) or seeker
    userType: {
        type : String,
        required: true,
    },

    profession: String,

    businesses: [Business],

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const User = mongoose.model('User', userSchema);

export default User;



import mongoose from 'mongoose';

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
        minlength: 5
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

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const User = mongoose.model('User', userSchema);

export default User;



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

    // userType: Specialist(bronze, silver, gold) or seeker
    userType: {
        type : String,
        required: true
    },

    profession: String,

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const User = mongoose.model('User', userSchema);

export default User;



import mongoose from 'mongoose';

export const businessSchema = mongoose.Schema({

    owner: mongoose.Schema.Types.ObjectId, 
    employees: [mongoose.Schema.Types.ObjectId], // List of user IDs of people that have restricted rights to R/W operations

    name: {
        type: String,
        required: true
    },

    // Address to be changed as required for google map api
    address: { 
        streetAddress: { 
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        subdivisionName: { 
            type: String,
            required: false
        },
        subdivisionCode: { 
            type: String,
            required: false
        },
        country: { 
            type: String,
            required: false
        },
        full: { 
            type: String,
            required: false
        },
    },

    phoneNumber: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: false
    },

    serviceType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    wageType: {
        type: String,
        required: true
    },
    
    hourlyWage: {
        type: String,
        equired: false,
    },

    hasScheduleApp: {
        type: Boolean,
        required: true,
    },
    
    linkToSchedule: {
        type: String,
        required: false,
    },

    keySearchTerms: [String],

    selectedTier: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Business = mongoose.model('Business', businessSchema);

export default Business;



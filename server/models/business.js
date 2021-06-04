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
            required: true
        },
        city: {
            type: String,
            required: true
        },
        subdivisionName: { 
            type: String,
            required: true
        },
        subdivisionCode: { 
            type: String,
            required: true
        },
        country: { 
            type: String,
            required: true
        },
        full: { 
            type: String,
            required: true
        },
    },

    phoneNumber: {
        type: String,
        required: true
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



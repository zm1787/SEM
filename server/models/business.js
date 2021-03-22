import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({

    //owners: [Schema.Types.ObjectId], // all rights to R/W operations
    //employees: [Schema.Types.ObjectId], // restricted rights to R/W operations

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

    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Business = mongoose.model('Business', businessSchema);

export default Business;



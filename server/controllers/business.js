import mongoose from 'mongoose';
import Business from '../models/business.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Stripe from 'stripe';


export const registerBusiness = async (req, res) => {
    try {
        const {
            hasAddress,
            hasEmail,
            hasPhoneNumber,

            businessName,
            address,
            phoneNumber,
            email,
            serviceType,
            searchTerms,
            businessDescription,
            wageType,
            hourlyWage,
            policyChecked,
            selectedTier,
        } = req.body;

        // Validation
        if ((hasAddress && (!address.country || !address.city || !address.subdivisionName || !address.streetAddress))) {
            return res.status(400).json({ msg: 'Please make sure the business address section is correctly filled or uncheck the "I want to advertise an address" checkbox.' });
        }
        if ((!phoneNumber && hasPhoneNumber)) {
            return res.status(400).json({ msg: 'Please add a phone number or uncheck the "I want to advertise my phone number" checkbox.' });
        }
        if ((!email && hasEmail)) {
            return res.status(400).json({ msg: 'Please add an email address or uncheck the "I want to advertise my email address" checkbox.' });
        }

        if (!businessName
            || !serviceType
            || !selectedTier
            || !businessDescription
            || !wageType
            || (wageType === 'hourly' && hourlyWage === "")
        ) {
            return res.status(400).json({ msg: "Please make sure all fields in the form have been correctly filled before signing up a business." });
        }

        const fullAddress = `${address.streetAddress}, ${address.city}, ${address.subdivisionCode}, ${address.country}`;
        const existingBusiness = await Business.findOne({ name: businessName, 'address.full': fullAddress });
        if (existingBusiness) {
            return res.status(400).json({ msg: "A business with this name and address already exists." });
        }

        if (!policyChecked) {
            return res.status(400).json({ msg: "Please read and agree to the Terms of Service." });
        }

        const newBusiness = new Business({
            name: businessName,
            address: {
                ...address,
                full: `${address.streetAddress}, ${address.city}, ${address.subdivisionCode}, ${address.country}`,
            },
            owner: req.user, // Add userID to owners
            phoneNumber,
            email,
            serviceType,
            keySearchTerms: [...searchTerms],
            description: businessDescription,
            wageType,
            hourlyWage,
            selectedTier,
        });

        // Push new business id to user's array of businesses
        const user = await User.findOneAndUpdate(
            { _id: req.user },
            { $push: { businesses: newBusiness._id } },
        );

        // Save new business in business collection
        newBusiness.save();

        res.json({
            business: newBusiness,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
}

export const myBusinesses = async (req, res) => {
    try {
        // Find all objecs that follows/fits the User model
        const user = await User.findById(req.user).select('businesses');

        console.log(user.businesses)

        const businesses = await Business.find({
            '_id': { $in: user.businesses }
        }).select('_id name')

        console.log(businesses)

        // Return status 200 (Ok), and .json array of found user object in database to front-end
        res.status(200).json(businesses);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const fetchBusinessDetails = async (req, res) => {
    try {
        // Get id of wanted business
        const { id } = req.params;

        // Get list of businesses of that user
        const selectedBusiness = await Business.findById(id)

        // Return status 200 (Ok), and Business details
        res.status(200).json(selectedBusiness);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const getNearbyBusinesses = async (req, res) => {
    try {
        let businesses = await Business.find(/*{ $or: [{ 'address.city': "Dieppe" }, { 'address.city': "Moncton" }] }*/).lean()

        var user;
        for (const business of businesses) {
            user = await User.findById(business.owner).select("_id firstName lastName");
            business.owner = user;
            business.selectedTier = undefined;
            business.createdAt = undefined;
        }

        // Return status 200 (Ok), and .json array of found user object in database to front-end
        res.status(200).json(businesses);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

// INCOMPLETE
export const payment = async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "CAD",
            description: "Buying a spatula",
            payment_method: id,
            confirm: true,
        })

        console.log("Payment", payment)

        res.json({
            message: "Payment successful",
            success: true,
        })
    } catch (error) {
        console.log("Error: ", error,)
        res.status(500).json({
            message: "Payment failed",
            success: false,
        })
    }
}







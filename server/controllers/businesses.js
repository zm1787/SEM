import mongoose from 'mongoose';
import Business from '../models/business.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Stripe from 'stripe';


export const registerBusiness = async (req, res) => {
    try {
        const {
            businessName,
            address,
            phoneNumber,
            serviceType,
            searchTerms,
            businessDescription,
            wageType,
            hourlyWage,
            policyChecked,
            selectedTier,
        } = req.body;
        
        // Validation
        if (!businessName
            || !address.country
            || !address.city
            || !address.subdivisionName
            || !address.streetAddress
            || !phoneNumber
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
            
            // Validate Payment?
            
            // Verify and set membership level (bronze, silver, gold)
            
            // 
            
            const newBusiness = new Business({
                name: businessName,
                address: {
                    ...address,
                    full: `${address.streetAddress}, ${address.city}, ${address.subdivisionCode}, ${address.country}`,
                },
                
                phoneNumber,
                serviceType,
                keySearchTerms: [...searchTerms],
                description: businessDescription,
                wageType,
                hourlyWage,
                selectedTier,
            });
            
            
            let savedBusiness = await newBusiness.save();
            
            res.json({
                business: savedBusiness,
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
        }
    }
    
    dotenv.config();
    const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

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







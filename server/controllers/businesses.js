import mongoose from 'mongoose';
import Business from '../models/business.js';
import jwt from 'jsonwebtoken';


export const registerSeeker = async (req, res) => {
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
        } = req.body;

        // Validation
        if (!businessName
            || !address.country
            || !address.subdivisionName
            || !address.streetAddress
            || !phoneNumber
            || !serviceType
            || !businessDescription
            || !wageType
            || (wageType === 'hourly' && hourlyWage === "")
        ) {
            return res.status(400).json({ msg: "Please make sure all fields in the form have been correctly filled before signing up a business." });
        }

        const existingBusiness = await Business.findOne({ name: businessName, address: address });
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
                full: `${address.streetAddress}, ${address.subdivisionCode}, ${address.country}`,
            },
            
            phoneNumber,
            serviceType,
            keySearchTerms: [...searchTerms],
            description: businessDescription,
            wageType,
            hourlyWage,
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









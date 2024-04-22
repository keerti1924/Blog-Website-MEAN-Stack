import Subscriber from "../models/Subscriber.model.js";

export const newsletter = async (req, res) => {

    const { email } = req.body;
    // Create a new subscriber
    const newSubscriber = new Subscriber({ 
        email,
    });
    try {
        // Check if the email is already subscribed
        const existingEmail = await Subscriber.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        await newSubscriber.save();

        res.status(201).json("Subscription successful!!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};
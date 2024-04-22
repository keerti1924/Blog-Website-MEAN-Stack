import Contact from "../models/Contact.model.js"

export const contact = async (req, res) => {

    const { name, email, subject, message } = req.body;
    // Check if the email is already registered
    const existingEmail = await Contact.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    try {
        // Create a new contact
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
        });
        await newContact.save();
        
        res.status(201).json({ message: 'Contact form submitted successfully !!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
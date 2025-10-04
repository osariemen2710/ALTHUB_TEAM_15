
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { name, email, picture } = payload;
        
        // In a real application, you would find or create a user in your database here.
        console.log('User info:', { name, email, picture });
        
        // For this example, we'll just send back a success message and the user data.
        res.status(200).json({ message: 'Login successful', user: { name, email, picture } });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(400).json({ message: 'Invalid Google token' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

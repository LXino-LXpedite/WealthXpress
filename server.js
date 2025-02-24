const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

// Configure price IDs for different plans
const PRICE_IDS = {
    plus: 'price_1QvqmDJNO4EWGgapi8QuU2jC',  // Plus+ price ID
    pro: 'price_1QvqmfJNO4EWGgapTGWvwUbf'    // Pro price ID
};

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.DOMAIN}/success.html`,
            cancel_url: `${process.env.DOMAIN}/cancel.html`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle webhook events from Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle subscription events
    switch (event.type) {
        case 'customer.subscription.created':
            // Add user to database with active subscription
            break;
        case 'customer.subscription.deleted':
            // Update user subscription status
            break;
    }

    res.json({ received: true });
});

app.listen(3000, () => console.log('Server running on port 3000')); 
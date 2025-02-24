require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPrices() {
    try {
        // Create Plus+ price
        const plusPrice = await stripe.prices.create({
            unit_amount: 599, // $5.99 in cents
            currency: 'usd',
            recurring: {
                interval: 'month'
            },
            product: 'prod_RpVnlIKbViM7HD', // Plus+ product ID
        });

        // Create Pro price
        const proPrice = await stripe.prices.create({
            unit_amount: 1099, // $10.99 in cents
            currency: 'usd',
            recurring: {
                interval: 'month'
            },
            product: 'prod_RpVohWYAP2Hk4y', // Pro product ID
        });

        console.log('Plus+ Price ID:', plusPrice.id);
        console.log('Pro Price ID:', proPrice.id);
    } catch (error) {
        console.error('Error creating prices:', error);
    }
}

createPrices(); 
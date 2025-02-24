// Initialize Stripe with the publishable key
const stripe = Stripe('pk_live_51Qvon4JNO4EWGgapKzWeIkpoSeEYklx7IL70OBI5Zd92SEmgWotAsxYIDokR4kUUGryRdsJepkDegEvIwoZ5T8nA00tV95kAHd');

// Price IDs from your Stripe Dashboard
const PRICE_IDS = {
    plus: 'price_1QvqmDJNO4EWGgapi8QuU2jC',  // Plus+ price ID
    pro: 'price_1QvqmfJNO4EWGgapTGWvwUbf'    // Pro price ID
};

// Add click event listeners when the document loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up payment buttons...');
    
    // Plus Plan Button
    const plusButton = document.getElementById('plus-plan-button');
    if (plusButton) {
        plusButton.addEventListener('click', async () => {
            console.log('Plus button clicked');
            await handleSubscription(PRICE_IDS.plus);
        });
    } else {
        console.error('Plus button not found');
    }

    // Pro Plan Button
    const proButton = document.getElementById('pro-plan-button');
    if (proButton) {
        proButton.addEventListener('click', async () => {
            console.log('Pro button clicked');
            await handleSubscription(PRICE_IDS.pro);
        });
    } else {
        console.error('Pro button not found');
    }
});

async function handleSubscription(priceId) {
    try {
        console.log('Starting subscription process for price ID:', priceId);
        
        // Create a checkout session
        const response = await fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: priceId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Network response was not ok: ${errorData}`);
        }

        const session = await response.json();
        console.log('Checkout session created:', session);

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error('Stripe redirect error:', result.error);
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error in handleSubscription:', error);
        alert('Something went wrong. Please try again.');
    }
} 
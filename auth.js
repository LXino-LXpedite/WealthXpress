// Example of protecting premium routes
function requireSubscription(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    
    if (!req.user.subscription.active) {
        return res.redirect('/pricing');
    }
    
    next();
}

// Use middleware for protected routes
app.get('/premium-content', requireSubscription, (req, res) => {
    res.render('premium-content');
}); 
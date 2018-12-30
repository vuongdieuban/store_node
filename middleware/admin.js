
function admin(req, res, next) {
    // req.user from auth middleware function, which happens before admin middleware function
    if (!req.user.isAdmin) return res.status(403).send('Access Denied')
    next();
}

module.exports = admin;
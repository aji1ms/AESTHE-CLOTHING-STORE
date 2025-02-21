const User = require("../models/userSchema");

// --userAuth middleare --

const userAuth = (req, res, next) => {
    if (req.session.user) {
        User.findById(req, session.user)
            .then(data => {
                if (data && !isBlocked) {
                    next();
                } else {
                    res.redirect("/login");
                }
            })
            .catch(error => {
                console.log("Error in user auth middleware", error);
                res.status(500).send("Internal Server Error");
            })
    } else {
        res.redirect("/login")
    }
}

// --userAuth middleare --


const adminAuth = (req, res, next) => {
    User.find({ isAdmin: true })
        .then(data => {
            if (data) {
                next()
            } else {
                res.redirect("/admin/adminlogin")
            }
        })
        .catch(error => {
            console.log('Error in admin auth middleware', error);
            res.status(500).send("Internal Server Error");
        })
}


module.exports = {
    userAuth,
    adminAuth,
}
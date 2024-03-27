require("dotenv").config;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

// user homepage
router.get("/", userController.homePage);

// user login via email
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", (req, res) => {
    passport.authenticate("google", (err, user, info) => {
        if (err || !user) {
            res.send(
                `<script>window.opener.postMessage({ error: "${info.message}" }, "*"); window.close();</script>`
            );
            return;
        }

        const userToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.send(
            `<script>window.opener.postMessage({ userToken: "${userToken}" }, "*"); window.close();</script>`
        );
        return;
    });
});

// user login
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

// user login success - get new token
router.get('/refresh', userController.refreshToken)

// user logout
router.get('/logout', userController.logout)



module.exports = router;

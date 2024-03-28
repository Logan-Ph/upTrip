require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken, generateRefreshToken } = require("../utils/helper");
const jwt = require("jsonwebtoken")

exports.homePage = (req, res) => {
	res.send("This is homepage");
};

exports.getLogin = (req, res) => {
  	res.send("This is login page");
};

exports.postLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user) return res.status(404).send("Please check your username and password");

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) return res.status(400).send("Password is incorrect");

	const refreshToken = generateRefreshToken(user)

	const userToken = generateToken(user);
	res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "None", maxAge: 30 * 60 * 1000, secure: true}) // 30 minutes
	
	return res.status(200).json({
		success: true,
		roles: [2001],
		username,
		email: user.email,
		_id: user._id,
		accessToken: userToken,
	});
};

exports.refreshToken = async (req, res) => {
	const {refreshToken} = req.cookies
	if (!refreshToken) return res.status(401).send("You are not logged in")
	jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) return res.status(403).send("Token is not valid")
		const user = await User.findById(decoded.id)
		if (!user) return res.status(404).send("User not found")
		const accessToken = generateToken(user)
		res.status(200).json({accessToken: accessToken, roles: [2001]})
	})
}

exports.googleLogin = async (req,res) => {
	const {email, given_name, family_name, email_verified, sub, picture} = req.body
	const user = await User.findOne({email})
	if (!user) {
		const newUser = new User({
			name: `${given_name} ${family_name}`,
			email,
			googleId: sub,
			verified: email_verified,
			img: picture,
		})
		await newUser.save()
		const userToken = generateToken(newUser)
		const refreshToken = generateRefreshToken(newUser)
		res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "None", maxAge:  30 * 60 * 1000, secure: true}) // 30 minutes
		return res.status(200).json({
			success: true,
			roles: [2001],
			email: newUser.email,
			_id: newUser._id,
			accessToken: userToken,
		})
	}else if (!user.googleId){
		return res.status(400).send("Email is already registered")
	}
}

exports.logout = async (req, res) => {
    res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true})
    res.status(200).send("Logged out")
}

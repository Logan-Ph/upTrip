require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken, generateRefreshToken, sendEmailVerification } = require("../utils/helper");
const jwt = require("jsonwebtoken")

exports.homePage = (req, res) => {
	res.send("This is homepage");
};

exports.getLogin = (req, res) => {
  	res.send("This is login page");
};

exports.postLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(404).send("Invalid credentials");

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

	const refreshToken = generateRefreshToken(user)

	const userToken = generateToken(user);
	res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "None", maxAge: 30 * 60 * 1000, secure: true}) // 30 minutes
	
	return res.status(200).json({
		success: true,
		roles: [2001],
		email,
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
	}else{
		const userToken = generateToken(user)
		const refreshToken = generateRefreshToken(user)
		res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "None", maxAge:  30 * 60 * 1000, secure: true}) // 30 minutes
		return res.status(200).json({
			success: true,
			roles: [2001],
			email: user.email,
			_id: user._id,
			accessToken: userToken,
		})
	}
}

exports.logout = async (req, res) => {
    res.clearCookie("refreshToken", {path: '/', httpOnly: true, sameSite: "None", secure: true});
    res.status(200).send("Logged out");
}

exports.signup = async(req, res) => {
  try {
		let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const email = req.body.email;
		
		if (!emailRegex.test(email)) {
		throw new Error("Invalid email address");
		}

		if (await User.findOne({ email: email })) {
		throw new Error("Email already exists.")
		}

		const userData = {
		email: email,
		password: req.body.password,
		name: `${req.body.firstName} ${req.body.lastName}`,
		}

		sendEmailVerification(userData, '10m', res)
		return res.status(200).json("Thank you for registering! A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account. If you don't see the email, please check your spam folder.");
  } catch (error) {
	return res.status(500).send(error.message || "Error Occured");
  }
}

exports.verifyEmail = async (req, res) => {
	jwt.verify(req.params.token, process.env.VERIFY_EMAIL, async (err, userData) => {
	  	if (err) return res.status(500).json("Invalid Link")

		if (await User.findOne({email: userData.email})) {
		return res.status(500).json("Email already exists.")
		}

		const newUser = new User({
			email: userData.email,
			password: await bcrypt.hash(userData.password, 10),
			name: userData.name,
			verified: true
		});
		await newUser.save();

	  return res.status(200).json("Email verified successfully")
	})
}


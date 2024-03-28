require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken, generateRefreshToken } = require("../utils/helper");
const jwt = require("jsonwebtoken")

function sendEmailVerification(userEmail) {
  try {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS
      }
    }

    let transporter = nodemailer.createTransport(config);

    let mailgenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Uptrip",
        link: "https://up-trip.vercel.app/"
      }
    })
    const userToken = jwt.sign({ user: userEmail }, process.env.VERIFY_EMAIL, { expiresIn: '10m' });
    const url = `http://localhost:3000/user/${userToken}/verify-email`;

    let response = {
      body: {
        intro: "Email verification",
        outro: `Please click on this link to verify your email ${url}, This link will be expired in 10 minutes`,
      }
    }

    let mail = mailgenerator.generate(response);

    let message = {
      from: "rBuy@gmail.com",
      to: userEmail,
      subject: "Email verification",
      html: mail
    }
    transporter.sendMail(message)
  }
  catch {
    console.log("error when send Email")
  }
}

exports.homePage = (req, res) => {
	res.send("This is homepage");
};

exports.getLogin = (req, res) => {
  	res.send("This is login page");
};

exports.postLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user) return res.status(404).send("Invalid credentials");

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) return res.status(400).send("Invalid credentials");

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
    res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true})
    res.status(200).send("Logged out")
}

exports.register = async(req, res) => {
  const bcrypt = require('bcrypt');
  try {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = req.body.email;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (await User.findOne({ email: email })) {
      return res.status(500).json("Email already exists.")
    } else {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        name: req.body.name,
        verified: false
      });
      await newUser.save();
      sendEmailVerification(email)
      return res.status(200).json("Thank you for registering! A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account. If you don't see the email, please check your spam folder.");
    }
  } catch (error) {
    res.status(500).send(error.message || "Error Occured");
  }
}

exports.verifyEmail = async (req, res) => {
  jwt.verify(req.params.token, process.env.VERIFY_EMAIL, async (err, user) => {
    if (err) return res.status(500).json("error");
    const foundUser = (await User.findOneAndUpdate({ email: user.user }, { verify: true }))
    if (!foundUser) return res.status.json("error");
    return res.status(200).json("success")
  })
}
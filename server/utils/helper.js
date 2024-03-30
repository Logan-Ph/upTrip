require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.generateToken = (user) => {
  return jwt.sign(
	{
	  id: user._id,
	  name: user.name,
	  email: user.email,
	  username: user.username,
	  verified: user.verified,
	},
	process.env.JWT_SECRET,
	{ expiresIn: "30m" }
	);
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
	{
	  id: user._id,
	  name: user.name,
	  email: user.email,
	  username: user.username,
	  verified: user.verified,
	},
	process.env.JWT_SECRET,
	{ expiresIn: "1d" }
  	);
};

exports.generateVerifyToken = (userData, expiresIn) => {
	return jwt.sign(
		{
			name: userData.name,
			email: userData.email,
			password: userData.hashedPassword,
		},
		process.env.VERIFY_EMAIL,
		{ expiresIn: expiresIn}
	)
}
exports.sendEmailVerification = (userData, expiresIn, res) => {
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
		const userToken = this.generateVerifyToken(userData, expiresIn);
		const url = `http://localhost:3000/user/${userToken}/verify-email`;
		
		let response = {
		  body: {
			intro: "Email verification",
			outro: `Please click on this link to verify your email ${url}, This link will be expired in 10 minutes`,
		  }
		}
	
		let mail = mailgenerator.generate(response);
	
		let message = {
		  from: '"Uptrip" <levelupyourtrip@gmail.com>',
		  to: userData.email,
		  subject: "Uptrip Email verification",
		  html: mail
		}
		transporter.sendMail(message)
	  }
	  catch (err) {
		console.error(err);
	  }
}


require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { baseOrigin} = require('./url')

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
	{ expiresIn: "15s" }
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
	{ expiresIn: "30m" }
  	);
};

exports.generateVerifyToken = (userData, expiresIn) => {
	return jwt.sign(
		{
			name: userData.name,
			email: userData.email,
			password: userData.password,
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
		const url = `${baseOrigin}/user/${userToken}/verify-email`;
		
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

exports.convertDateFormat = (dateString) => {
	const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    // Construct the date string in the desired format
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
}

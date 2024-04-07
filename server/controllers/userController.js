require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken, generateRefreshToken, sendEmailVerification } = require("../utils/helper");
const jwt = require("jsonwebtoken")
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
const chromium = require('chrome-aws-lambda')

// let puppeteer;
// let chrome = {}
// let options = {args: ['--no-sandbox', '--disable-setuid-sandbox'] }

// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
// 	puppeteer = require('puppeteer-core')
// 	chrome = require('chrome-aws-lambda')
// }else{
// 	puppeteer = require('puppeteer')
// }


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
	res.clearCookie("refreshToken", {httpOnly: true, sameSite: "None", secure: true}) // remove the cookies
	req.session.destroy()
	res.status(200).send("Logged out")
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

		if (await User.findOne({email})) {
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

exports.quickSearchHotels = async (req, res) => {
	try{
		let	options = {
				args: [...chromium.args, '--hide-scrollbars', '--disabled-web-security'],
				executablePath: await chromium.executablePath,
				headless: true,
				defaultViewport: chromium.defaultViewport,
				ignoreHTTPSErrors: true,
				ignoreDefaultArgs: ['--disable-extensions']
			}

		const {keyword} = req.params

		const browser = await chromium.puppeteer.launch(options)
		const page = await browser.newPage()
		await page.setUserAgent(userAgent);

		await page.goto(`https://www.trip.com/global-gssearch/searchlist/search/?keyword=${keyword}&locale=en_xx&curr=VND`)
		await page.waitForSelector('div.gl-search-result_list > div.content', {visible: true, timeout: 5000})

		const hotelButton = await page.$$('.gl-search-result_tabs > li:nth-child(3)')
		await hotelButton[0].click()
		await page.waitForSelector('div.gl-result-hotel', {visible: true, timeout: 5000})
		const hotelList = await page.$$('div.gl-search-result_list > div.content')

		let hotels = []

		for (const hotel of hotelList){
			try{
				let hotelName, hotelLink, hotelPrice, hotelImage, hotelReviewScore, hotelNumberReview

				try{
					hotelName = await page.evaluate(el => el.querySelector('div.gl-search-result_list-title > a').textContent, hotel)
				}catch(er){
					hotelName = null
				}

				try{
					hotelLink = await page.evaluate(el => el.querySelector('div.gl-search-result_list-title > a').href, hotel)
				}catch(er){
					hotelLink = null
				}

				try{
					hotelPrice = await page.evaluate(el => el.querySelector('div.gl-search-result_list-price > span').textContent, hotel)
				}catch(er){
					hotelPrice = null
				}

				try{
					hotelImage = await page.evaluate(el => el.querySelector('div.default-img > a > img').src, hotel)
				}catch(er){
					hotelImage = null
				}

				try{
					hotelReviewScore = await page.evaluate(el => el.querySelector('span.score-review_score').textContent, hotel)
				}catch(er){
					hotelReviewScore = null
				}

				try{
					hotelNumberReview = await page.evaluate(el => el.querySelector('span.score-review_review').textContent, hotel)
				}catch(er){
					hotelNumberReview = null
				}

				hotels.push({hotelName, hotelLink, hotelImage, hotelReviewScore, hotelNumberReview, hotelPrice})
			}catch (er) {}
		}
		return res.status(200).json({hotels})
	}catch (error) {
		console.log(error)
		return res.status(500).json(error);
	}
}

exports.quickSearchAttractions = async (req,res) => {
	try{
		// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
		// 	options = {
		// 		args: [...chrome.args, '--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars', '--disabled-web-security'],
		// 		executablePath: await chrome.executablePath,
		// 		headless: true,
		// 		defaultViewport: chrome.defaultViewport,
		// 		ignoreHTTPSErrors: true,
		// 	}
		// }
		let	options = {
			args: [...chromium.args, '--hide-scrollbars', '--disabled-web-security'],
			executablePath: await chromium.executablePath,
			headless: true,
			defaultViewport: chromium.defaultViewport,
			ignoreHTTPSErrors: true,
			ignoreDefaultArgs: ['--disable-extensions']
		}

		const {keyword} = req.params

		const browser = await chromium.puppeteer.launch(options)
		const page = await browser.newPage()
		await page.setUserAgent(userAgent);
	
		await page.goto(`https://www.trip.com/global-gssearch/searchlist/search/?keyword=${keyword}&locale=en_xx&curr=VND`)
		await page.waitForSelector('div.gl-search-result_list > div.content', {visible: true, timeout: 5000})
	
		const attractionsButton = await page.$$('.gl-search-result_tabs > li:nth-child(4)')
		await attractionsButton[0].click()

		await page.waitForSelector('div.gl-result-mixlist', {visible: true, timeout: 5000})
		const attractionsList = await page.$$('div.gl-search-result_list > div.content')
		let attractions = []

		for (const attraction of attractionsList){
			try{
				let attractionName, attractionLink, attractionImage, attractionPrice, attractionReviewScore, attractionNumberReview

				try{
					attractionName = await page.evaluate(el => el.querySelector('div.gl-search-result_list-title > a').textContent, attraction)
				}catch (er) {
					attractionName = null
				}

				try{
					attractionLink = await page.evaluate(el => el.querySelector('div.gl-search-result_list-title > a').href, attraction)
				}catch (er) {
					attractionLink = null
				}

				try{
					attractionImage = await page.evaluate(el => el.querySelector('div.default-img > a > img').src, attraction)
				}catch (er) {
					attractionImage = null
				}

				try{
					attractionPrice = await page.evaluate(el => el.querySelector('div.gl-search-result_list-price > span').textContent, attraction)
				}catch (er) {
					attractionPrice = null
				}

				try{
					attractionReviewScore = await page.evaluate(el => el.querySelector('span.score-review_score').textContent, attraction)
				}catch (er) {
					attractionReviewScore = null
				}

				try{
					attractionNumberReview = await page.evaluate(el => el.querySelector('span.score-review_review').textContent, attraction)
				}catch (er) {
					attractionNumberReview = null
				}

				attractions.push({attractionName, attractionLink, attractionImage, attractionReviewScore, attractionNumberReview, attractionPrice})
			}catch (er) {}
		}
		return res.status(200).json({attractions})
	}catch (error){
		console.log(error)
		return res.status(500).json(error);
	}
}


require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { baseOrigin } = require("./url");

/**
 * Generates a JWT token for a user with a short expiration.
 * @param {Object} user - The user object containing user details.
 * @returns {string} A JWT token string.
 */
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

/**
 * Generates a JWT refresh token for a user with a longer expiration.
 * @param {Object} user - The user object containing user details.
 * @returns {string} A JWT refresh token string.
 */
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

/**
 * Generates a verification token for a user's email with a custom expiration.
 * @param {Object} userData - The user data containing name, email, and password.
 * @param {string} expiresIn - The duration for which the token is valid.
 * @returns {string} A JWT token string for email verification.
 */
exports.generateVerifyToken = (userData, expiresIn) => {
    return jwt.sign(
        {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        },
        process.env.VERIFY_EMAIL,
        { expiresIn: expiresIn }
    );
};

/**
 * Sends an email verification link to the user's email.
 * @param {Object} userData - The user data containing name, email, and password.
 * @param {string} expiresIn - The duration for which the verification link is valid.
 * @param {Object} res - The response object to send back HTTP responses.
 */
exports.sendEmailVerification = (userData, expiresIn, res) => {
    try {
        let config = {
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS,
            },
        };

        let transporter = nodemailer.createTransport(config);

        let mailgenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Uptrip",
                link: "https://up-trip.vercel.app/",
            },
        });
        const userToken = this.generateVerifyToken(userData, expiresIn);
        const url = `${baseOrigin}/user/${userToken}/verify-email`;

        let response = {
            body: {
                intro: "Email verification",
                outro: `Please click on this link to verify your email ${url}, This link will be expired in 10 minutes`,
            },
        };

        let mail = mailgenerator.generate(response);

        let message = {
            from: '"Uptrip" <levelupyourtrip@gmail.com>',
            to: userData.email,
            subject: "Uptrip Email verification",
            html: mail,
        };
        transporter.sendMail(message);
    } catch (err) {
        console.error(err);
    }
};

/**
 * Converts a date string from 'YYYYMMDD' format to 'YYYY/MM/DD' format.
 * @param {string} dateString - The date string in 'YYYYMMDD' format.
 * @returns {string} The formatted date string in 'YYYY/MM/DD' format.
 */
exports.convertDateFormat = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    // Construct the date string in the desired format
    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
};

/**
 * Gets the current time formatted for display in Agoda's specific format and timezone.
 * @returns {string} The current time formatted and URL-encoded.
 */
exports.getDecodedCurrentTimeAgoda = () => {
    const now = new Date();
    const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
        timeZone: "Asia/Bangkok",
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(now);

    const indochinaTime = `${formattedDate} (Indochina Time)`;

    return encodeURIComponent(indochinaTime);
};

/**
 * Gets the current UTC time minus 7 hours, formatted as an ISO string.
 * @returns {string} The adjusted current time in ISO format.
 */
exports.getCurrentTimeUTC = () => {
    const now = new Date();
    now.setHours(now.getHours() - 7); // Subtract 7 hours from the current time
    return now.toISOString();
}

/**
 * Converts a date string from 'YYYY-MM-DD' to an ISO string representing 17:00 UTC of that day.
 * @param {string} dateString - The date string in 'YYYY-MM-DD' format.
 * @returns {string} The UTC date in ISO format.
 */
exports.convertToUTCFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const utcDate = new Date(Date.UTC(year, month - 1, day, 17, 0, 0, 0));
    return utcDate.toISOString();
}

/**
 * Calculates the length of stay between two dates.
 * @param {string} checkInDate - The check-in date in 'YYYY-MM-DD' format.
 * @param {string} checkOutDate - The check-out date in 'YYYY-MM-DD' format.
 * @returns {number} The number of days between the check-in and check-out dates.
 */
exports.calculateLengthOfStay = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const differenceInTime = checkOut.getTime() - checkIn.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return  Number(differenceInDays);
}
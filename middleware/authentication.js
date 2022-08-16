const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
	// we get the Authorization key from the req.headers.authorization object and pass it to a variable //
	const authHeader = req.headers.authorization;

	// here we check whether the Authorization key exist and if the starts with Bearer, if it does not throw error //
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authorization Invalid');
	}

	// if the Authorization key exists and it starts with Bearer, get token from authHeader //
	const token = authHeader.split(' ')[1];

	// we pass token into try/catch block //
	try {
		// here we get the decoded details from the token which is the user info //
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// we attach the user info from the payload to the job routes //
		req.user = { userId: payload.userId, name: payload.name };
		// we call the next() to pass it on to the job routes //
		next();
	} catch (error) {
		throw new UnauthenticatedError('Authorization Invalid');
	}
};

module.exports = auth;

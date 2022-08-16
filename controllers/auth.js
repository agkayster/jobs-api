const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	// const { name, email, password } = req.body;

	// Using the below error check is optional //
	// if (!name || !email || !password) {
	// 	throw new BadRequestError('Please provide a name, email and password');
	// }

	// Create our salt //
	// const salt = await bcrypt.genSalt(10);
	// Hash our password mixed with salt //
	// const hashedPassword = await bcrypt.hash(password, salt);

	// const tempUser = { name, email, password: hashedPassword };
	// console.log('get req body =>', req.body);
	// define our user //
	const user = await User.create({ ...req.body });

	//define our token to send back //
	const token = user.createJWT();

	// send back the token
	res.status(StatusCodes.CREATED).json({
		msg: 'user created',
		user: { name: user.name },
		token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	// check whether the user put in an email and password //
	if (!email || !password) {
		throw new BadRequestError('Please provide an email and a password');
	}

	const user = await User.findOne({ email });

	// check whether user's email is authenticated and matches //
	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	// here we check if password entered is correct by calling the compare method from models folder //
	const isPasswordCorrect = await user.comparePassword(password);

	// here we say if the password passed into the isPasswordCorrect variable is not correct//
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	// if password is correct then create and send token //
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		msg: `Welcome ${user.name}`,
		user: { name: user.name },
		token,
	});
};

module.exports = { register, login };

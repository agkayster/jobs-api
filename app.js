require('dotenv').config();
require('express-async-errors');

// extra packages //
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();
const port = require('./config/environment');

// connectDB
const connectDB = require('./db/connect');

// import authentication middleware //
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// rateLimiter configuration //
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // using 15 mins
		max: 100, // limit each IP to 100 requests per windowMs
	})
);

app.use(express.json()); // To parse POST requests //
// extra packages
app.use(cors());
app.use(helmet());
app.use(xss());

app.get('/', (req, res) => {
	res.send('jobs api');
});

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();

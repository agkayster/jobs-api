// import Job from model //
const Job = require('../models/Job');
// import StatusCodes //
const { StatusCodes } = require('http-status-codes');
// import errors //
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
	// here we get all jobs created by a particular user based on req.user.userId (this comes from the auth middleware) //
	const jobs = await Job.find({ createdBy: req.user.userId }).sort(
		'createdAt' // createdAt sorts the jobs created by the user based on the date and time the jobs were created//
	);
	// we then passed the jobs to json and the number of such jobs based on jobs.length //
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// const getAllJobs = async (req, res) => {
// 	// here we get all jobs created by everyone //
// 	const jobs = await Job.find({}).sort(
// 		'createdAt' // createdAt sorts the jobs created based on the date and time the jobs were created//
// 	);
// 	// we then passed the jobs to json and the number of such jobs based on jobs.length //
// 	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
// };

const getJob = async (req, res) => {
	// we console log req.params.id to get the job id and req.user.userId to get the id of the user that created the job //
	console.log(req.params.id, req.user.userId);

	// here we destructure user.userId and params.id from req.user.userId  (userId) and req.params.id (jobId) //
	const {
		user: { userId },
		params: { id: jobId },
	} = req;

	// here we find the job with a particular job id ( from _id) created by a particular user using userId(from createdBy) //
	const job = await Job.find({ _id: jobId, createdBy: userId });

	// if job does not exist //
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	// if job exists //
	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	// console.log('get req body =>', req.body);

	// here we say let req.body.createdBy be the same as req.user.userId //
	req.body.createdBy = req.user.userId;
	// here we created a job using the req.body form //
	const job = await Job.create(req.body);
	// here we pass the job we created into json
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	// here we destructure body (contains company and position), user (with userId from auth middleware) and params for jobId from req //
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId },
	} = req;

	// here if company and position are empty strings, not filled then we throw the error //
	if (company === '' || position === '') {
		throw new BadRequestError('Company or Position fields cannot be empty');
	}

	// else we find the job based on the job id, the user id of the user who creatd the job and we update the job using req.body form //
	const job = await Job.findByIdAndUpdate(
		{ _id: jobId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);

	// if job does not exist, we throw the error //
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}
	// we send back the job to json //
	res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
	// here we destructure user (with userId from auth middleware) and params for jobId from req //
	const {
		user: { userId },
		params: { id: jobId },
	} = req;

	// we find the job based on the user id from auth middleware, the job id from params and then delete the job //
	const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

	// if job does not exist, throw error //
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId} found`);
	}

	// else send response back to the user //
	res.status(StatusCodes.OK).send(`Job with id ${jobId} deleted`);
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };

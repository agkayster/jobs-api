const mongoose = require('mongoose');

const { Schema } = mongoose;

const JobSchema = new Schema(
	{
		company: {
			type: String,
			required: [true, 'Please enter a company name'],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please enter a position'],
			maxlength: 200,
    },
    // status should not be filled in create job or update/edit job in POSTMAN app as it is default by nature //
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
    },
    // createdBy does not need to be filled in create job or update/edit job in POSTMAN app as it references the User Model //
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User', // ref means the schema we are referencing. to get the user who created a job, we take the schema from the User schema //
			required: [true, 'Please provide a user'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);

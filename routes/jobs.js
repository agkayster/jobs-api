const express = require('express');
const router = express.Router();

const {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
} = require('../controllers/jobs');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

// OR

// router.get('/', getAllJobs);
// router.post('/', createJob);
// router.get('/:id', getJob);
// router.patch('/:id', updateJob);
// router.delete('/:id', deleteJob);

module.exports = router;

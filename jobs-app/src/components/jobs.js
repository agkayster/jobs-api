import React, { useState, useEffect, useContext } from 'react';
import { axiosJobsInstance } from '../Utils/API';
import AppContext from '../Utils/AppContext';
import JobsFormDisplay from './jobsFormDisplay';

const Jobs = () => {
	/* we use AppContext(Context API) to being in our token from localstorage  */
	const { token } = useContext(AppContext);
	const [jobs, setJobs] = useState([]);
	// const [isChecked, setIsChecked] = useState({});
	const [formData, setFormData] = useState({});

	/* useEffect gets our token and message from localStorage once the component loads and 
	also fetches our jobs from the API */
	useEffect(() => {
		/* pass token into GET request to obtain all jobs */
		const getAllJobs = async () => {
			try {
				const { data } = await axiosJobsInstance.get('jobs', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log('get jobs data =>', data?.jobs);

				setJobs(data?.jobs);
			} catch (error) {
				console.log(error);
			}
		};
		getAllJobs();
	}, [token]);

	// Handles our new job submit form //
	const handleJobsSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosJobsInstance.post('jobs', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			window.location.pathname = '/jobs';
		} catch (error) {
			console.log('get error =>', error);
		}
		setFormData({});
	};

	const handleDelete = async (id) => {
		try {
			await axiosJobsInstance.delete(`jobs/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log('get delete data =>', data);
			window.location.pathname = '/jobs';
		} catch (error) {
			console.log('get delete error =>', error);
		}
	};

	// handles all our new job creation and inputs into the form //
	const handleInputJobsChange = (e) => {
		const { id, value } = e.target;
		setFormData((formData) => ({ ...formData, [id]: value }));
	};

	console.log('get jobs input form data =>', formData);

	return (
		<JobsFormDisplay
			handleJobsSubmit={handleJobsSubmit}
			handleInputJobsChange={handleInputJobsChange}
			formData={formData}
			jobs={jobs}
			handleDelete={handleDelete}
		/>
	);
};

export default Jobs;

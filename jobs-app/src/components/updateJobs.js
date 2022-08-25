import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Utils/AppContext';
import { axiosJobsInstance } from '../Utils/API';
import { useParams } from 'react-router-dom';
import UpdateJobsForm from './updateJobsForm';

const UpdateJobs = () => {
	const { token } = useContext(AppContext);
	const [formData, setFormData] = useState({});
	const [jobsData, setJobsData] = useState([]);
	const [dataMessage, setDataMessage] = useState('');

	// "id" here must match the id paramter in <Route	path='/jobs/:id' in App.js //
	let { id } = useParams();

	useEffect(() => {
		const getSingleJob = async () => {
			// console.log('get job id =>', id);
			// console.log('get single job token =>', token);
			try {
				const { data } = await axiosJobsInstance.get(`jobs/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setJobsData(data?.job);
			} catch (error) {
				console.log('get single job error =>', error);
			}
		};
		getSingleJob();
	}, [id, token]);

	// here we handle the editing/updating of a single job //
	const handleUpdateJobSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axiosJobsInstance.patch(
				`jobs/${id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log('get updated data =>', data);
			if (data) setDataMessage('update successfull...');
		} catch (error) {
			console.log('get udpated job error =>', error);
		}
	};

	// updates all our input and select changes //
	const handleUpdateJobChange = (e) => {
		const { id, value } = e.target;
		setFormData((formData) => ({ ...formData, [id]: value }));
	};

	console.log('get updated job form data =>', formData);

	if (!jobsData) return <h3>Loading...</h3>;
	return (
		<>
			{/* Import this from updateJobsForm component */}
			<UpdateJobsForm
				handleUpdateJobSubmit={handleUpdateJobSubmit}
				jobsData={jobsData}
				handleUpdateJobChange={handleUpdateJobChange}
				dataMessage={dataMessage}
				formData={formData}
			/>
		</>
	);
};

export default UpdateJobs;

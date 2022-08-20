import React, { useState, useEffect } from 'react';
import { axiosJobsInstance } from '../Utils/API';

const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const [token, setToken] = useState('');
	const [message, setMessage] = useState('');
	const [isChecked, setIsChecked] = useState({});
	const [date, setDate] = useState('');

	/* useEffect gets our token and message from localStorage once the component loads and 
	also fetches our jobs from the API */

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		setMessage(localStorage.getItem('message'));

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

				data?.jobs.map(({ createdAt }) => setDate(createdAt));
			} catch (error) {
				console.log(error);
			}
		};
		getAllJobs();
	}, [token, message]);

	// ensure we can check buttons independent of the cards //
	const handleJobStatusChange = (e) => {
		const { id, value } = e.target;
		const cloneIsChecked = { ...isChecked };

		cloneIsChecked[id] = value;
		setIsChecked(cloneIsChecked);
	};

	// converting ISO Dates to normal dates //
	const jobDate = new Date(date);
	const jobDay = jobDate.getDate();
	const jobMonth = jobDate.getMonth() + 1;
	const jobYear = jobDate.getFullYear();
	const jobCreatedAt = `${jobDay}/${jobMonth}/${jobYear}`;

	console.log('get state jobs =>', jobs);
	console.log('get state message =>', message);
	// console.log('get is checked =>', isChecked);
	// console.log('get date =>', date);

	if (jobs.length === 0)
		return <p className="font-['Roboto_Slab']">Loading...</p>;
	return (
		<div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen pt-5'>
			{/* <div>
				<p className='font-["Roboto_Slab"] text-white pl-2'>
					{message}
				</p>
			</div> */}
			<div className='max-w-sm w-full lg:max-w-full px-1 flex flex-row justify-between mt-5'>
				{jobs &&
					jobs.map(
						({
							_id: jobId,
							company,
							position,
							status,
							createdAt,
						}) => (
							<div
								key={jobId}
								className=' border-gray-400 border lg:border-gray-400 my-2 rounded pl-2 
								leading-normal bg-yellow-300 opacity-80'>
								<div className='mb-2'>
									<div className='text-gray-900 font-bold text-xl'>
										<h5 className='font-["Roboto_Slab"] mt-1'>
											Company: {company}
										</h5>
										<h5 className='font-["Roboto_Slab"] mt-3'>
											Position: {position}
										</h5>
										<div className='flex'>
											<label className='font-["Roboto_Slab"] mt-3'>
												Status:
											</label>
											<div>
												<input
													type='radio'
													className='border-2 mt-5 rounded-md pl-2 font-["Roboto_Slab"] ml-2'
													value={status}
													id={jobId}
													checked={
														isChecked[jobId] ===
														status
													}
													onChange={
														handleJobStatusChange
													}
												/>
												{status}
												<input
													type='radio'
													className='border-2 rounded-md pl-2 font-["Roboto_Slab"] ml-2'
													value='declined'
													id={jobId}
													checked={
														isChecked[jobId] ===
														'declined'
													}
													onChange={
														handleJobStatusChange
													}
												/>
												declined
												<input
													type='radio'
													className='border-2 rounded-md pl-2 font-["Roboto_Slab"] ml-2'
													value='interview'
													id={jobId}
													checked={
														isChecked[jobId] ===
														'interview'
													}
													onChange={
														handleJobStatusChange
													}
												/>
												interview
											</div>
										</div>

										<h5 className='font-["Roboto_Slab"] mt-3'>
											Posted: {jobCreatedAt}
										</h5>
									</div>
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default Jobs;

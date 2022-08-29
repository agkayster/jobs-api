import React from 'react';
import { Link } from 'react-router-dom';

// we export this to updateJobs.js as a Child component //
const UpdateJobsForm = ({
	handleUpdateJobSubmit,
	jobsData,
	handleUpdateJobChange,
	dataMessage,
	formData,
}) => {
	return (
		<div className='relative bg-[#eeb34b] h-screen overflow-x-hidden'>
			<div className='grid h-24 justify-center pt-5'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 w-96 font-["Roboto_Slab"]'
					onSubmit={handleUpdateJobSubmit}>
					<h2 className='text-center text-xl'>Update Job</h2>
					{jobsData &&
						jobsData.map(
							({
								company,
								position,
								status,
								createdBy,
								_id: jobId,
							}) => (
								<div key={jobId}>
									<div className='mb-4'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='company'>
											Company
										</label>
										<input
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											id='company'
											type='text'
											placeholder={company}
											value={formData.company || ''}
											onChange={handleUpdateJobChange}
										/>
									</div>
									<div className='mb-6'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='position'>
											Position
										</label>
										<input
											className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
											id='position'
											type='text'
											placeholder={position}
											value={formData.position || ''}
											onChange={handleUpdateJobChange}
										/>
									</div>
									{/* Always use this for select/option for forms */}
									<div className='mb-6'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='position'>
											Status
										</label>
										<select
											id='status'
											value={formData.status || ''}
											className='border-2 border-gray-600'
											onChange={handleUpdateJobChange}>
											<option value='declined'>
												declined
											</option>
											<option value='pending'>
												pending
											</option>
											<option value='interview'>
												interview
											</option>
										</select>
									</div>
								</div>
							)
						)}
					<p className='text-green-800'>{dataMessage}</p>
					<div className='flex w-screen'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80'
							type='submit'>
							Edit
						</button>
					</div>
				</form>
			</div>
			<div className='absolute inset-x-64 top-[27.5rem] md:top-0 md:left-3/4'>
				<Link to='/jobs'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-4/10 mr-5 mt-5'
						type='submit'>
						Dashboard
					</button>
				</Link>
			</div>
		</div>
	);
};

export default UpdateJobsForm;

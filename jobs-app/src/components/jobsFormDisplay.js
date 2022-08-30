import React from 'react';
import JobsDisplay from './jobsDisplay';

// we export this to jobs.js component //
const JobsFormDisplay = React.memo(
	({
		handleJobsSubmit,
		handleInputJobsChange,
		formData,
		jobs,
		handleDelete,
	}) => {
		return (
			<div className='container mx-auto px-4 bg-[#eeb34b] relative h-screen md:h-screen overflow-x-hidden'>
				<div className='grid h-24 justify-center pt-3'>
					<form
						className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 w-96 font-["Roboto_Slab"]'
						onSubmit={handleJobsSubmit}>
						<h2 className='text-center text-xl'>New Job</h2>
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
								value={formData.company || ''}
								onChange={handleInputJobsChange}
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
								value={formData.position || ''}
								onChange={handleInputJobsChange}
							/>
						</div>
						<div className='flex w-screen'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80'
								type='submit'>
								Submit
							</button>
						</div>
					</form>
				</div>
				<JobsDisplay jobs={jobs} handleDelete={handleDelete} />
			</div>
		);
	}
);

export default JobsFormDisplay;

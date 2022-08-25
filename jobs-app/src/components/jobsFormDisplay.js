import React from 'react';
import { Link } from 'react-router-dom';
// use momemnt.js to manipulate our date output //
import moment from 'moment';
// we export this to jobs.js component //
const JobsFormDisplay = ({
	handleJobsSubmit,
	handleInputJobsChange,
	formData,
	jobs,
	handleDelete,
}) => {
	return (
		<div className='container mx-auto px-4 bg-[#eeb34b] relative h-screen'>
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
			<div className='mt-64'>
				<div className='w-full max-w-full flex sm:flex-col md:flex-row md:flex-wrap justify-between mt-5'>
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
									className='relative w-72 h-48 border-gray-400 border lg:border-gray-400 bg-[#ffd5b6] my-2 rounded pl-2 
								leading-normal'>
									<div className='mb-2'>
										<div className='text-gray-900 text-lg'>
											<h5 className='font-["Roboto_Slab"] mt-8'>
												{position}
											</h5>
											<h5 className='font-["Roboto_Slab"] mt-3 border-2 rounded border-gray-500 w-fit'>
												{company}
											</h5>
											<h5 className='absolute bottom-0 right-0 pr-1 bg-slate-300'>
												{status}
											</h5>
											<div className='flex mt-3'>
												<Link to={`/jobs/${jobId}`}>
													<p className='mr-3'>Edit</p>
												</Link>

												<p
													onClick={() =>
														handleDelete(jobId)
													}
													className='cursor-pointer'>
													Delete
												</p>
											</div>

											<h5 className='font-["Roboto_Slab"] mt-0 absolute top-0 right-0 pr-1 bg-slate-300'>
												{moment(createdAt).format(
													'MMMM Do YYYY'
												)}
											</h5>
										</div>
									</div>
								</div>
							)
						)}
				</div>
			</div>
		</div>
	);
};

export default JobsFormDisplay;

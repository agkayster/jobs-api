import React from 'react';
import { Link } from 'react-router-dom';
// use momemnt.js to manipulate our date output //
import moment from 'moment';

// this is exported to jobsFormDisplay.js as a Child component //
function JobsDisplay({ jobs, handleDelete }) {
	return (
		<div className='mt-64'>
			<div className='w-full max-w-full grid grid-cols-2 gap-4 md:flex md:flex-row md:flex-wrap justify-between mt-5'>
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
	);
}

export default JobsDisplay;

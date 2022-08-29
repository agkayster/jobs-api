import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Utils/API';
import 'react-toastify/dist/ReactToastify.css';

function UserRegister() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [error, setError] = useState('');

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((formData) => ({ ...formData, [id]: value }));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axiosInstance.post('register', formData);
			console.log('get all data =>', data);

			navigate('/login', { replace: true });
		} catch (error) {
			setError(error);
		}
	};

	// method to give us better display error //
	const displayError = () => {
		return error?.response?.data?.msg ===
			'Duplicate value entered for email field, please choose another email value'
			? 'email or password has been used'
			: null;
	};

	console.log('get form data =>', formData);

	return (
		<div className='bg-[#eeb34b] overflow-x-hidden'>
			<div className='grid h-screen place-items-center'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 border-2 w-96 font-["Roboto_Slab"]'
					onSubmit={handleFormSubmit}>
					<h2 className='text-center text-xl'>Register</h2>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='name'>
							name
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='name'
							type='text'
							value={formData.name || ''}
							onChange={handleInputChange}
						/>
						<p className='text-sm text-red-700'>{displayError()}</p>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='email'>
							email
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							type='email'
							value={formData.email || ''}
							onChange={handleInputChange}
						/>
						<p className='text-sm text-red-700'>{displayError()}</p>
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'>
							Password
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							value={formData.password || ''}
							onChange={handleInputChange}
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
				<div className='registerLogin'>
					<p className="font-['Roboto_Slab']">
						Already registered? {''}
						<Link to='/login'>
							<span className='text-black font-["Roboto_Slab"] hover:text-red-600'>
								Please login
							</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default UserRegister;

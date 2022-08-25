import React, { useState, useContext } from 'react';
import { axiosInstance } from '../Utils/API';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AppContext from '../Utils/AppContext';

function UserLogin() {
	const navigate = useNavigate();
	const { setToken, setMessage } = useContext(AppContext);
	const [formData, setFormData] = useState({});
	const [loginError, setLoginError] = useState({});

	const handleLoginChange = (e) => {
		const { id, value } = e.target;
		setFormData((formData) => ({ ...formData, [id]: value }));
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axiosInstance.post('login', formData);

			/* We pass in data.token and data.msg to AppContext using in App.js */
			setToken(data?.token);
			setMessage(data?.msg);

			/* This sets our token and message in localStorage to be picked up in AppContext in App.js */
			localStorage.setItem('message', data?.msg);
			localStorage.setItem('token', data?.token);

			console.log('get toast');
			toast.success(data?.msg);

			console.log('get new data =>', data);
			/* navigate to jobs page */
			navigate('/jobs');
		} catch (error) {
			/* We remove the localStorage if user is not authorised */
			localStorage.removeItem('message');
			localStorage.removeItem('token');
			setLoginError(error);
		}
	};

	const getLoginError = () => {
		if (loginError?.response?.data?.msg === 'Invalid Credentials') {
			return 'wrong username or password';
		} else {
			return;
		}
	};

	console.log('get form data for login =>', formData);

	return (
		<div className='bg-[#eeb34b]'>
			<div className='grid h-screen place-items-center'>
				<form
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 w-96 font-["Roboto_Slab"]'
					onSubmit={handleLoginSubmit}>
					<h2 className='text-center text-xl'>Login</h2>
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
							onChange={handleLoginChange}
						/>
						<p className='text-sm text-red-700'>
							{getLoginError()}
						</p>
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
							onChange={handleLoginChange}
						/>
						<p className='text-sm text-red-700'>
							{getLoginError()}
						</p>
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
		</div>
	);
}

export default UserLogin;

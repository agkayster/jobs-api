import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Utils/AppContext';

export default function Navbar() {
	/* Destruture token and message from AppContext */
	const { token, message } = useContext(AppContext);

	const logout = () => {
		/* Local storage sets our token when we login and we use logout method to remove
    token from localStorage */
		localStorage.removeItem('token');
		localStorage.removeItem('message');
		/* location.pathname allows us to log out and immediately refresh the login window */
		window.location.pathname = '/login';
	};
	return (
		<nav className='navigation flex items-center relative h-[60px] w-full p-[0.5rem_0rem] shadow-[0_2px_2px_2px_rgba(9,9,9,0.23)] text-black bg-[#fe8529]'>
			<Link
				to='/'
				className='brand-name no-underline text-black text-[1.3rem] ml-[1rem]'>
				JobsApp
			</Link>
			<button className='hamburger border-0 h-10 w-10 p-[0.5rem] rounded-[50%] bg-[#283b8b] cursor-pointer transition-[background-color 0.2s ease-in-out] absolute top-[50%] right-[25px] translate-y-[-50%] hidden hover:bg-[#2642af]'>
				{/* icon from heroicons.com */}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='white'>
					<path
						fillRule='evenodd'
						d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
			<div className='ml-auto flex'>
				<h2 className='text-black font-["Roboto_Slab"] mr-3'>
					{/* This code works because of window.location.pathname in login.js which causes a refresh */}
					{token && message}
				</h2>
				{token && (
					<button
						className='no-underline block mx-4'
						onClick={logout}>
						Sign Out
					</button>
				)}
			</div>
		</nav>
	);
}

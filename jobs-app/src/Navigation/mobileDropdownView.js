import React from 'react';

// exported to Navbar.js //
function MobileDropdownView({ isExpandable, token, message, logout }) {
	return (
		<>
			<div
				className={
					(isExpandable ? 'top-[60px]' : 'top-[-200px]') +
					' absolute z-50 w-full h-48 py-8 bg-[#fe8529] text-center transition-top ease-in-out duration-1000 md:bg-transparent md:border-0 md:flex md:flex-row justify-end md:py-4 md:pr-4 md:top-0 md:h-0 md:transition-none'
				}>
				<h2 className='text-black font-["Roboto_Slab"] md:mr-3'>
					{/* This code works because of window.location.pathname in login.js which causes a refresh */}
					{token && message}
				</h2>
				{token && (
					<button
						className='text-black font-["Roboto_Slab"] mt-5 md:mt-0'
						onClick={logout}>
						Sign Out
					</button>
				)}
			</div>
		</>
	);
}

export default MobileDropdownView;

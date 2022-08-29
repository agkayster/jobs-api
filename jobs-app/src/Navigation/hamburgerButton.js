import React from 'react';
import { IconContext } from 'react-icons';

// hamburgerButton is exported to Navbar.js //
const HamburgerButton = ({
	expandInMobileView,
	HiOutlineMenuAlt2,
	isExpandable,
}) => {
	return (
		<>
			<button
				className='border-0 h-9 w-9 p-[0.5rem] mr-2 rounded-[50%] bg-[#283b8b] md:hidden'
				onClick={expandInMobileView}>
				{/* icon from heroicons.com */}
				{isExpandable ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 transition ease-in-out duration-1000'
						viewBox='0 0 20 20'
						fill='white'>
						<path
							fillRule='evenodd'
							d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
							clipRule='evenodd'
						/>
					</svg>
				) : (
					<IconContext.Provider
						value={{
							color: 'white',
							className: 'transition ease-in-out duration-1000',
						}}>
						<HiOutlineMenuAlt2 />
					</IconContext.Provider>
				)}
			</button>
		</>
	);
};

export default HamburgerButton;

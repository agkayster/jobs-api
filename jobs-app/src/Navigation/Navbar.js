import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Utils/AppContext';
import HamburgerButton from './hamburgerButton';
import MobileDropdownView from './mobileDropdownView';
import { logout } from './logoutMethod';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

export default function Navbar() {
	/* Destruture token and message from AppContext */
	const { token, message } = useContext(AppContext);
	const [isExpandable, setIsExpandable] = useState(false);

	// function that controls the hamburger click in mobile view //
	const expandInMobileView = (e) => {
		setIsExpandable(!isExpandable);
	};

	return (
		<nav className='navigation bg-[#fe8529] block relative'>
			<div className='flex justify-between py-3'>
				<Link
					to='/'
					className='brand-name no-underline font-["Roboto_Slab"] text-black text-[1.3rem] ml-[1rem]'>
					JobsApp
				</Link>
				<HamburgerButton
					expandInMobileView={expandInMobileView}
					HiOutlineMenuAlt2={HiOutlineMenuAlt2}
					isExpandable={isExpandable}
				/>
			</div>
			{/* isExpandable controls the hamburger dropdown in mobile view */}
			<MobileDropdownView
				token={token}
				message={message}
				logout={logout}
				isExpandable={isExpandable}
			/>
		</nav>
	);
}

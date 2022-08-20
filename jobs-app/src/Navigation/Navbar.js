import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useNavigate, Link } from 'react-router-dom';
// import { withRouter } from '../Utils/withRouter';

const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function Navbar() {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [token, setToken] = useState('');

	useEffect(() => {
		const getTokenMessage = () => {
			if (!token && !message) {
				return (
					setToken(localStorage.getItem('token')),
					setMessage(localStorage.getItem('message'))
				);
			}
		};
		getTokenMessage();
	}, [token, message]);

	const logout = () => {
		setToken(localStorage.removeItem('token'));
		setMessage(localStorage.removeItem('message'));
		navigate('/login');
	};

	// console.log('get message in navbar =>', message);
	// console.log('get nav token =>', token);

	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<XIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<MenuIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex-shrink-0 flex items-center'>
									<Link
										to='/'
										className='block lg:hidden h-8 w-auto text-white font-["Roboto_Slab"]'>
										JobsApp
									</Link>
									<Link
										to='/'
										className='hidden lg:block h-8 w-auto text-white font-["Roboto_Slab"]'>
										JobsApp
									</Link>
									{/* <img
										className='block lg:hidden h-8 w-auto'
										src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
										alt='Workflow'
									/>
									<img
										className='hidden lg:block h-8 w-auto'
										src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
										alt='Workflow'
									/> */}
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<h2 className='text-white font-["Roboto_Slab"] mr-3'>
									{/* This code works because of window.location.pathname in login.js which causes a refresh */}
									{token && message}
								</h2>

								{/* Profile dropdown */}
								<Menu as='div' className='ml-3 relative'>
									<div>
										{/* This code works because of window.location.pathname in login.js which causes a refresh */}
										{token && (
											<Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
												<span className='sr-only'>
													Open user menu
												</span>
												<h3 className='text-white font-["Roboto_Slab"]'>
													Sign Out
												</h3>
											</Menu.Button>
										)}
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'>
										<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													// <a
													// 	href='/login'
													// 	className={classNames(
													// 		active
													// 			? 'bg-gray-100'
													// 			: '',
													// 		'block px-4 py-2 text-sm text-gray-700'
													// 	)}>
													// 	Sign out
													// </a>

													<button
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
														onClick={logout}>
														Sign Out
													</button>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as='a'
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={
										item.current ? 'page' : undefined
									}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
export default Navbar;

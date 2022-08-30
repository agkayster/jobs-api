import UserRegister from './components/userRegister';
import UserLogin from './components/userLogin';
import { useState, Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import { Toaster } from 'react-hot-toast';
import AppContext from './Utils/AppContext';
import SecureRoute from './Utils/SecureRoute';

// install react lazy loading library //
import loadable from '@loadable/component';

// implement react lazy loading library called loadable //
const Jobs = loadable(() => import('./components/jobs'));
const UpdateJobs = loadable(() => import('./components/updateJobs'));

function App() {
	/* we use token and message in state to point directly to where token is in localStorage */
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : null
	);
	const [message, setMessage] = useState(
		localStorage.getItem('message') ? localStorage.getItem('message') : null
	);

	return (
		/* we pass token, message, setToken and setMessage to Context.Provider. Which makes it available everywhere in the App */
		<AppContext.Provider value={{ token, message, setToken, setMessage }}>
			<BrowserRouter>
				<Fragment>
					<Navbar />
					<Routes>
						<Route
							path='/jobs'
							element={<SecureRoute Component={Jobs} />}
						/>
						<Route
							path='/jobs/:id'
							element={<SecureRoute Component={UpdateJobs} />}
						/>
						{/* <Route path='/' element={<UserRegister />} /> */}
						<Route index element={<UserRegister />} />
						<Route path='/login' element={<UserLogin />} />
					</Routes>
					<Toaster
						toastOptions={{
							duration: 5000,
							position: 'top-right',
							success: {
								style: {
									background: '#333',
									color: '#fff',
								},
							},
							error: {
								duration: 5000,
								position: 'bottom-left',
								style: {
									background: 'red',
									color: '#fff',
								},
							},
						}}
					/>
				</Fragment>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;

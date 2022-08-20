import './App.css';
import UserRegister from './components/userRegister';
import UserLogin from './components/userLogin';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Jobs from './components/jobs';
import Navbar from './Navigation/Navbar';
import { Toaster } from 'react-hot-toast';
import AppContext from './Utils/AppContext';

function App() {
	const [message, setMessage] = useState('');
	const [token, setToken] = useState('');
	useEffect(() => {
		localStorage.getItem('message');
		localStorage.getItem('token');

		setMessage('message');
		setToken('token');
	}, []);

	console.log('get message', message);
	console.log('get token', token);
	return (
		<AppContext.Provider value={{}}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<UserRegister />} />
					<Route path='/login' element={<UserLogin />} />
					<Route path='/jobs' element={<Jobs />} />
				</Routes>
				<Toaster
					toastOptions={{
						duration: 5000,
						position: 'bottom-right',
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
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;

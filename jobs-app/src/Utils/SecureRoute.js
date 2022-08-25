import React, { useContext } from 'react';
import { Navigate,} from 'react-router-dom';
import AppContext from './AppContext';

// Ensures that users cannot get to url routes without a token //
const SecureRoute = ({ Component }) => {
	const { token } = useContext(AppContext);
	// console.log('get secure route token =>', token);
	// if user is logged in, they have a token, take them to the requested route //
	// if (token)
	// 	return (
	// 		<Routes>
	// 			<Route {...props} />;
	// 		</Routes>
	// 	);
	return token ? <Component /> : <Navigate to='/login' />;
	// otherwise redirect to login
	// return <Navigate to='/login' />;
};

export default SecureRoute;

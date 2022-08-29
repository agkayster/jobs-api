// exported to Navbar.js //
export const logout = () => {
	/* Local storage sets our token when we login and we use logout method to remove
    token from localStorage */
	localStorage.removeItem('token');
	localStorage.removeItem('message');
	/* location.pathname allows us to log out and immediately refresh the login window */
	window.location.pathname = '/login';
};

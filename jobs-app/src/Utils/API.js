import axios from 'axios';
const endpoint = 'https://jobs-api-ejike.herokuapp.com/api/v1/auth/';

export const axiosInstance = axios.create({
	baseURL: endpoint,
});

const jobsEndPoint = 'https://jobs-api-ejike.herokuapp.com/api/v1';

export const axiosJobsInstance = axios.create({
	baseURL: jobsEndPoint,
});

import axios from 'axios';

const registerAxios = axios.create({
	baseURL: 'http://localhost:5000/user/register',
	headers: {
		'Content-type': 'application/json',
	},
});

export default registerAxios;

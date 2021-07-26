import axios from 'axios';

const loginAxios = axios.create({
	baseURL: 'http://localhost:5000/user/login',
	headers: {
		'Content-type': 'application/json',
	},
});

export default loginAxios;

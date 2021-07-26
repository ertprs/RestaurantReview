import loginAxios from './http/loginAxios.js';

class LoginDataService {
	loginRequest(user_email, passwordString) {
		console.log('!! loginRequest !!');
		const body = {
			email: user_email,
			password: passwordString,
		};
		const result = loginAxios.post('/', body).then((r) => {
			console.log('login result: ', r);
			return r;
		});
		return result;
	}
}

export default new LoginDataService();

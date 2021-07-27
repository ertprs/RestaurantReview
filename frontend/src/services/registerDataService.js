import registerAxios from './http/registerAxios.js';

class RegisterDataService {
	registerRequest(user_name, user_email, passwordString) {
		console.log('!! registerRequest !!');
		const body = {
			username: user_name,
			email: user_email,
			password: passwordString,
		};
		const result = registerAxios.post('/', body).then((r) => {
			console.log('register result: ', r);
			return r;
		});

		return result;
	}
}

export default new RegisterDataService();

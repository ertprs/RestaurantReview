import registerAxios from './http/registerAxios.js';

class RegisterDataService {
	registerRequest(user_name, user_email, passwordString) {
		console.log('!! registerRequest !!');
		console.log('user_name: ', user_name);
		console.log('user_email: ', user_email);
		console.log('passwordString: ', passwordString);
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

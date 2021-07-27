import loginAxios from './http/loginAxios.js';

class LoginDataService {
	loginRequest(user_email, passwordString) {
		console.log('!! loginRequest !!');
		const body = {
			email: user_email,
			password: passwordString,
		};
		console.log('body: ', body);
		const result = loginAxios.post('/', body);
		// .then((r) => {
		// 	console.log('login result: ', r);
		// 	return r;
		// })
		// .catch((e) => {
		// 	console.log('login request failed: ', e);
		// });
		console.log('result: ', result);
		return result;
	}
}

export default new LoginDataService();

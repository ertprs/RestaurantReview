import UserDAO from '../../dao/userDAO.js';

export default class UserCtrl {
	static async apiRegisterUser(req, res, next) {
		console.log('apiRegisterUser');
		console.log('req.body: ', req.body);
		const result = await UserDAO.registerUser(
			req.body.username,
			req.body.email,
			req.body.password
		);
		console.log('result: ', result);
		return res.json(result);
	}

	static async apiLoginUser(req, res, next) {
		console.log('apiLoginUser');
		const result = await UserDAO.loginUser(
			req.body.user_email,
			req.body.password
		);
		console.log('login result: ', result);
		return res.json(result);
	}
}

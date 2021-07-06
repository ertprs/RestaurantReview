import express from 'express';
import UserCtrl from '../modelController/user.controller.js';

const UserRouter = express.Router();

UserRouter.route('/register').post((req, res) => {
	console.log('backend user registration');
	return UserCtrl.apiRegisterUser(req, res);
});

UserRouter.route('/login').post((req, res) => {
	console.log('user login');
	return UserCtrl.apiLoginUser(req, res);
});

export default UserRouter;

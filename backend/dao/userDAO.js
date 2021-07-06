import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserDAO {
	constructor() {
		this.userDB = null;
	}

	static async injectDB(mongoClient) {
		if (this.userDB) {
			return;
		}
		try {
			this.userDB = await mongoClient
				.db(process.env.AUTH_NS)
				.collection('User');
		} catch (e) {
			console.error(
				'Unable to connect to UserDB a collection in UserDAO: ' + e
			);
		}
	}

	static async registerUser(user_name, user_email, passwordString) {
		console.log('registerUser in DAO');
		console.log('user_email in DAO: ', user_email);
		const query = {
			email: user_email,
		};

		const existingUser = await this.userDB
			.findOne(query)
			.then((find_result) => {
				console.log('find result: ', find_result);
				if (find_result != null) {
					console.log('User Email already exists');
					return true;
				} else {
					return false;
				}
			})
			.catch((e) => {
				console.log('#38 Error with findOne');
				return {
					Error: 'Error Occured for finding user: ' + e,
				};
			});

		if (existingUser) {
			return {
				Error: 'The user email already exists in the database!',
			};
		}

		const passwordHash = await bcrypt
			.hash(passwordString, 10)
			.then((hash) => {
				return hash;
			})
			.catch((e) => {
				console.log('Error for creating password hash: ' + e);
				return null;
			});
		if (passwordHash == null) {
			return {
				Error: 'Error for creating password hash!',
			};
		}
		const newUser = {
			username: user_name,
			email: user_email,
			password: passwordHash,
		};

		const insertResult = await this.userDB
			.insertOne(newUser)
			.then((result) => {
				console.log('New User inserted: ' + result);
				return {
					message: 'Success: New User inserted',
				};
			})
			.catch((err) => {
				console.log('Error Occured for New User Registration: ' + err);
				return {
					Error: 'Error Occured for New User Registration: ' + err,
				};
			});
		return insertResult;
	}

	static async loginUser(user_email, passwordString) {
		const user = await this.userDB
			.findOne({
				email: user_email,
			})
			.then((findResult) => {
				console.log('findResult: ', findResult);
				if (findResult == null) {
					//User does not exist
					console.log('loginUser user does not exist');
					return {
						NotFound: 'User does not exist',
					};
				} else {
					return findResult;
				}
			})
			.catch((e) => {
				console.log('loginUser finding user failed');
				return {
					Error: 'finding user failed',
				};
			});
		console.log('user: ', user);
		if (user.hasOwnProperty('NotFound')) {
			return {
				NotFound: 'User does not exist',
			};
		}

		const passwordMatch = await bcrypt.compare(
			passwordString,
			user.password
		);

		if (passwordMatch) {
			const accessToken = jwt.sign(
				JSON.stringify(user),
				process.env.TOKEN_SECRET
			);
			return {
				accessToken: accessToken,
			};
		} else {
			return {
				Message: 'Invalid Credential',
			};
		}
	}
}

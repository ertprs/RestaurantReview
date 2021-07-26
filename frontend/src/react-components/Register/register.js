import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './register.css';

import registerIcon from '../../img/registerIcon.jpg';
import RegisterDataService from '../../services/registerDataService.js';
import { useHistory } from 'react-router-dom';

function Register() {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [emptyFieldError, setEmptyFieldError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordMismatchError, setPasswordMismatchError] = useState('');
	const [registerError, setRegisterError] = useState('');

	// function cleanup() {
	// 	setUsername('');
	// 	setEmail('');
	// 	setPassword('');
	// 	setPassword2('');
	// 	setEmptyFieldError('');
	// 	setPasswordMismatchError('');
	// 	setRegisterError('');
	// 	return;
	// }

	// useEffect(() => {
	// 	cleanup();
	// }, []);

	function validateForm() {
		if (
			email.length === 0 ||
			password.length === 0 ||
			password2.length === 0
		)
			return 1;
		if (!email.includes('@')) return 2;
		if (password.length < 8) return 3;
		if (password !== password2) return 4;
		return 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const validationCode = validateForm();
		if (validationCode === 0) {
			const response = await RegisterDataService.registerRequest(
				username,
				email,
				password
			);
			if (response === false) setRegisterError('Register Failed');
			else {
				history.push('/login');
			}
		} else {
			if (validationCode === 1) {
				setEmptyFieldError('All fields must be filled');
			}
			if (validationCode === 2) {
				setEmailError(
					'Please ensure the email is in a proper form (does not include @)'
				);
			}
			if (validationCode === 3) {
				setPasswordError(
					'Password is too short (must be longer than 8)'
				);
			}

			if (validationCode === 4) {
				passwordMismatchError('Please make sure the passwords match');
			}
			return false;
		}
	}

	function handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		if (name === 'username') setUsername(value);
		if (name === 'email') setEmail(value);
		if (name === 'password') setPassword(value);
		if (name === 'password2') setPassword2(value);

		event.preventDefault();
	}

	return (
		<div className="registerPage">
			<div className="card registerCard-custom">
				<div className="card-body outer-card-body">
					<div className="card card-custom2">
						<img
							src={registerIcon}
							alt="positive img"
							width={230}
							height={230}
							className="registerImg"
						/>
						<div className="card-body inner-card-body">
							<div className="card-title">Welcome</div>
							<div className="card-text registerBox">
								<form
									className="registerForm"
									onSubmit={handleSubmit}
								>
									<label>
										<text className="fieldLabel">
											Username
										</text>
										<input
											value={username}
											name="username"
											onChange={handleChange}
											required
										/>
									</label>
									<label>
										<text className="fieldLabel">
											Email
										</text>
										<input
											type="email"
											name="email"
											value={email}
											onChange={handleChange}
											required
										/>
									</label>
									<br></br>
									<label>
										<text className="fieldLabel">
											Password
										</text>
										<input
											type="password"
											name="password"
											value={password}
											onChange={handleChange}
											required
										/>
									</label>
									<br></br>
									<label>
										<text className="fieldLabel">
											Confirm Password
										</text>
										<input
											type="password"
											name="password2"
											value={password2}
											onChange={handleChange}
											required
										/>
									</label>
									<br></br>
									<input type="submit" value="Submit" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './register.css';

import registerIcon from '../../img/registerIcon.jpg';
import RegisterDataService from '../../services/registerDataService.js';

function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [emptyFieldError, setEmptyFieldError] = useState('');
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
		if (email.length * password.length * password2.length === 0) return 1;
		if (password !== password2) return 2;
		return 0;
	}

	async function handleSubmit(event) {
		console.log(event);
		event.preventDefault();
		const validationCode = validateForm();
		if (validationCode === 0) {
			const response = await RegisterDataService.registerRequest(
				username,
				email,
				password
			);
			if (response === false) setRegisterError('Register Failed');
		} else {
			if (validationCode === 1) {
				setEmptyFieldError('All fields must be filled');
			}
			if (validationCode === 2) {
				setPasswordMismatchError('Please ensure the password match');
			}
			return false;
		}
	}

	function handleUsernameChange(event) {
		console.log(event);
		setUsername(event.target.value);
		event.preventDefault();
	}

	function handleEmailChange(event) {
		console.log(event);
		setEmail(event.target.value);
		event.preventDefault();
	}

	function handlePasswordChange(event) {
		console.log(event);
		setPassword(event.target.value);
		event.preventDefault();
	}

	function handlePasswordChange2(event) {
		console.log(event);
		setPassword2(event.target.value);
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
											onChange={handleUsernameChange}
											required
										/>
									</label>
									<label>
										<text className="fieldLabel">
											Email
										</text>
										<input
											type="text"
											value={email}
											onChange={handleEmailChange}
											required
										/>
									</label>
									<br></br>
									<label>
										<text className="fieldLabel">
											Password
										</text>
										<input
											type="text"
											value={password}
											onChange={handlePasswordChange}
											required
										/>
									</label>
									<br></br>
									<label>
										<text className="fieldLabel">
											Confirm Password
										</text>
										<input
											type="text"
											value={password2}
											onChange={handlePasswordChange2}
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

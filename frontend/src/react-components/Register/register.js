import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './register.css';

import registerIcon from '../../img/add-user.png';
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
		<main className="registerPage">
			<div className="registerCard-custom">
				<section class="registerBox-top">
					<h4
						style={{
							fontWeight: '600',
							fontSize: '27px',
							color: 'rgb(70, 140, 189)',
						}}
					>
						Register
					</h4>
				</section>
				<section class="registerBox-body">
					<figure class="registerBox-left">
						<img
							src={registerIcon}
							alt="register img"
							width={180}
							height={180}
							className="registerImg"
						/>
					</figure>
					<article class="registerBox-right">
						<div className="registerForm-fields">
							{/* <div className="card-title">Welcome</div> */}
							<div className="registerForm">
								<form onSubmit={handleSubmit}>
									{/* <label class="form-label form-label-register">
										Username
									</label> */}
									<input
										class="form-input-box form-input-register"
										placeholder="Username"
										value={username}
										name="username"
										type="text"
										onChange={handleChange}
										required
										autoFocus
									/>

									{/* <label class="form-label">Email</label> */}
									<input
										class="form-input-box form-input-register"
										type="email"
										name="email"
										placeholder="Email"
										value={email}
										onChange={handleChange}
										required
									/>

									{/* <label class="form-label">Password</label> */}
									<input
										class="form-input-box form-input-register"
										type="password"
										name="password"
										placeholder="Password"
										value={password}
										onChange={handleChange}
										required
									/>

									{/* <label class="form-label">
										Confirm Password
									</label> */}
									<input
										class="form-input-box form-input-register"
										type="password"
										name="password2"
										placeholder="Confirm Password"
										value={password2}
										onChange={handleChange}
										required
									/>
									<input
										class="form-submit-btn form-submit-btn-register"
										type="submit"
										value="Register Now"
									/>
								</form>
							</div>
						</div>
					</article>
				</section>
			</div>
		</main>
	);
}

export default Register;

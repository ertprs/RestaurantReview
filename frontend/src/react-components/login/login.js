import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginDataService from '../../services/loginDataService.js';
import { useCookies } from 'react-cookie';
// import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './login.css';

function Login({ loginCallback }) {
	let history = useHistory();

	//cookie object
	const [cookies, setCookie, removeCookie] = useCookies();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function validateEmail(inputEmail) {
		setEmailError('');
		if (!inputEmail.includes('@')) {
			setEmailError("The email must contain '@'");
			return false;
		}
		return true;
	}

	function validatePassword(inputPassword) {
		setPasswordError('');
		if (inputPassword.length < 8) {
			setPasswordError(
				'The password is too short (must be longer than 8)'
			);
			return false;
		}
		return true;
	}

	function clearError() {
		setLoginError('');
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!validateEmail(email) || !validatePassword(password)) {
			console.log('not validated');
			return;
		}

		const loginResult = await LoginDataService.loginRequest(
			email,
			password
		);

		if (loginResult.data.hasOwnProperty('accessToken')) {
			console.log('setting cookie');
			setCookie('u_token', loginResult.data.accessToken, {
				path: '/',
				// httpOnly: true,
			});
			loginCallback();
			history.push('/');
		} else {
			if (
				loginResult.data.hasOwnProperty('Message') ||
				loginResult.data.hasOwnProperty('NotFound')
			) {
				if (loginResult.data.hasOwnProperty('Message')) {
					setLoginError(loginResult.data['Message']);
				}

				if (loginResult.data.hasOwnProperty('NotFound')) {
					setLoginError(loginResult.data['NotFound']);
				}
			}
		}
	}

	return (
		<div className="Login">
			<p>{loginError}</p>
			<div class="form-container">
				<form class="form-group" onSubmit={handleSubmit}>
					<div class="form-field-group">
						<label class="form-label">Email</label>
						<input
							class="form-input"
							required
							autoFocus
							type="email"
							value={email}
							onChange={(e) => {
								clearError();
								setEmail(e.target.value);
							}}
						/>
					</div>
					<p>{emailError}</p>
					<div class="form-field-group">
						<label class="form-label">Password</label>
						<input
							class="form-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							// onSubmit={(e) => validatePassword(e)}
						/>
					</div>
					<p>{passwordError}</p>
					<Button
						block
						size="lg"
						type="submit"
						// disabled={!validateForm()}
					>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
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
		console.log('handleSubmit');
		event.preventDefault();

		if (!validateEmail(email) || !validatePassword(password)) {
			console.log('not validated');
			return;
		}

		const loginResult = await LoginDataService.loginRequest(
			email,
			password
		);

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

		if (loginResult.data.hasOwnProperty('accessToken')) {
			console.log('setting cookie');
			setCookie('u_token', loginResult.data.accessToken, {
				path: '/',
				// httpOnly: true,
			});
			// localStorage.setItem('Authenticated', true);
			loginCallback();
			history.push('/');
			// return <Redirect to="/" />;
		}
	}

	return (
		<div className="Login">
			<p>{loginError}</p>
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						autoFocus
						type="email"
						value={email}
						onChange={(e) => {
							clearError();
							setEmail(e.target.value);
						}}
					/>
				</Form.Group>
				<p>{emailError}</p>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						// onSubmit={(e) => validatePassword(e)}
					/>
				</Form.Group>
				<p>{passwordError}</p>
				<Button
					block
					size="lg"
					type="submit"
					// disabled={!validateForm()}
				>
					Login
				</Button>
			</Form>
		</div>
	);
}

export default Login;

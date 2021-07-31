import React, { useState } from 'react';
import LoginDataService from '../../services/loginDataService.js';
import { useCookies } from 'react-cookie';
// import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import loginIcon from '../../img/signinIcon.png';

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
		<main className="Login">
			<p>{loginError}</p>
			<div class="form-container">
				<section class="loginBox">
					<section class="loginBox-top">
						<figure class="loginImg">
							<img
								src={loginIcon}
								alt="login img"
								width={120}
								height={120}
							/>
						</figure>
						<h4
							style={{
								fontWeight: '600',
								fontSize: '27px',
								color: 'rgb(36, 116, 171)',
							}}
						>
							Member Login
						</h4>
					</section>
					<section class="loginBox-body">
						<form
							class="form-group form-group-login"
							onSubmit={handleSubmit}
						>
							{/* <label class="form-label">Email</label> */}
							<input
								class="form-input-underlined form-input-login"
								required
								autoFocus
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => {
									clearError();
									setEmail(e.target.value);
								}}
							/>

							<p>{emailError}</p>
							{/* <label class="form-label">Password</label> */}
							<input
								class="form-input-underlined form-input-login"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								// onSubmit={(e) => validatePassword(e)}
							/>
							<p>{passwordError}</p>
							<input
								class="form-submit-btn form-submit-btn-login"
								type="submit"
								value="Login"
							/>
						</form>
					</section>
				</section>
			</div>
		</main>
	);
}

export default Login;

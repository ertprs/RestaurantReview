import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddReview from './react-components/add-reviews/add-reviews.js';
import Restaurant from './react-components/restaurants/restaurants.js';
import RestaurantsList from './react-components/restaurants-list/restaurants-list.js';
import Login from './react-components/Login/login.js';
import Register from './react-components/Register/register.js';
import NavBar from './react-components/navbar/navbar.js';
import HomePage from './react-components/HomePage/homepage.js';
import AboutPage from './react-components/AboutPage/aboutpage.js';

function App() {
	const [authentication, setAuthentication] = useState(false);

	// const [cookies, setCookie, removeCookie] = useCookies(['u_token']);
	// useEffect(() => {}, [authentication]);

	function loginCallback() {
		console.log('login callback called');
		setAuthentication(true);
	}

	return (
		<div className="App">
			<Router>
				<header>
					<NavBar auth={authentication}></NavBar>
				</header>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route path="/about">
						<AboutPage />
					</Route>
					<Route exact path="/restaurants">
						<RestaurantsList />;
					</Route>
					<Route
						path="/restaurants/:id"
						render={(props) => {
							<Restaurant {...props} />;
						}}
					></Route>
					<Route path="/reviews">
						<HomePage />
					</Route>
					<Route path="/login">
						<Login loginCallback={loginCallback} />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

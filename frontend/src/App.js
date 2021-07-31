import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddReview from './react-components/AddReview/addreview.js';
import Restaurant from './react-components/restaurants/restaurants.js';
import RestaurantsList from './react-components/restaurants-list/restaurants-list.js';
import Login from './react-components/Login/login.js';
import Register from './react-components/Register/register.js';
import NavBar from './react-components/navbar/navbar.js';
import HomePage from './react-components/HomePage/homepage.js';
import AboutPage from './react-components/AboutPage/aboutpage.js';
import ReviewPage from './react-components/ReviewPage/reviewpage.js';

function App() {
	let history = useHistory();
	const [authentication, setAuthentication] = useState(false);
	const [restaurantInfo, setRestaurantInfo] = useState({
		restaurant_id: null,
		name: '',
		cuisine: '',
		address: '',
	});

	function loginCallback() {
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
						<RestaurantsList />
					</Route>
					<Route exact path="/restaurants/review">
						{console.log('REACT Route executed?')}
						<ReviewPage restaurantInfo={restaurantInfo} />
					</Route>
					<Route path="/restaurants/review/addReview">
						<AddReview />
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

import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../../services/restaurantDataService.js';
import './restaurants-list.css';

import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RestaurantsList = () => {
	useEffect(() => {
		retrieveRestaurants();
	}, []);

	let history = useHistory();

	const [restaurants, setRestaurants] = useState([]);
	const [page, setPage] = useState(0);
	// const [restaurantInfo, setRestaurantInfo] = useState({
	// 	name: '',
	// 	cuisine: '',
	// 	address: '',
	// });

	const retrieveRestaurants = () => {
		RestaurantDataService.getAll(page)
			.then((res) => {
				setRestaurants(res.data.restaurants);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const getRestaurantURL = (restaurant_id) => {
		console.log('restaurant id1: ', restaurant_id);
		return `/restaurants/review?restaurant_id=${restaurant_id}`;
	};

	return (
		<div className="container">
			<div>
				<div class="searchBox-custom">
					<Dropdown class="dropdown-custom">
						<Dropdown.Toggle variant="secondary">
							Select Search Type
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#/action-1">
								Search by Name
							</Dropdown.Item>
							<Dropdown.Item href="#/action-2">
								Search by Zipcode
							</Dropdown.Item>
							<Dropdown.Item href="#/action-3">
								Search by Cuisine
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Form class="form-custom">
						<Form.Group>
							<Form.Control
								type="text"
								placeholder="Type Keyword"
							/>
						</Form.Group>
					</Form>
					<Button class="button-custom" type="submit">
						Search
					</Button>
				</div>
			</div>
			<section className="wrapper">
				{restaurants.map((restaurant) => {
					const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
					return (
						<section className="restaurant-box">
							<article className="restaurant-content">
								<h5>{restaurant.name}</h5>
								<text className="text-restaurant">
									<strong>Cuisine: </strong>
									{restaurant.cuisine}
								</text>
								<text className="text-restaurant">
									<strong>Address: </strong>
									{address}
								</text>
							</article>

							<div class="btn-group-restaurant">
								<a
									class="btn-review"
									href={getRestaurantURL(
										restaurant.restaurant_id
									)}
								>
									Reviews
								</a>
								<a class="btn-location" href="/">
									View Location
								</a>
							</div>
						</section>
					);
				})}
			</section>
		</div>
	);
};

export default RestaurantsList;

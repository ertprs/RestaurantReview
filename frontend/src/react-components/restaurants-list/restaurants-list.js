import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../../services/restaurantDataService.js';
import './restaurants-list.css';

import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RestaurantsList = (props) => {
	useEffect(() => {
		retrieveRestaurants();
	}, []);

	const [restaurants, setRestaurants] = useState([]);
	const [page, setPage] = useState(0);

	const retrieveRestaurants = () => {
		RestaurantDataService.getAll(page)
			.then((res) => {
				console.log('updated');
				setRestaurants(res.data.restaurants);
			})
			.catch((e) => {
				console.log(e);
			});
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

			<div className="row">
				{restaurants.map((restaurant) => {
					const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
					return (
						<div className="col-3 card-group-margin card-group">
							<div className="card card-custom">
								<div className="card-body card-body-custom">
									<h5 className="card-title">
										{restaurant.name}
									</h5>
									<p className="card-text">
										<strong>Cuisine: </strong>
										{restaurant.cuisine} <br />
										<strong>Address: </strong> {address}
									</p>

									{/* buttons */}
									<div className="row buttons-group">
										<div className="col-sm-5">
											<Link
												to={
													'/restaurants/' +
													restaurant.id
												}
												className="btn btn-primary link-custom"
											>
												More&nbsp;Info
											</Link>
										</div>
										<div className="col-sm-7">
											<Link
												to={
													'/restaurants/' +
													restaurant.id
												}
												className="btn btn-primary link-custom"
											>
												View&nbsp;Location
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RestaurantsList;

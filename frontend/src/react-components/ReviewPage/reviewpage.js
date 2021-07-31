import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../../services/restaurantDataService.js';

import './reviewpage.css';
import noDataImg from '../../img/noData.png';

const ReviewPage = () => {
	const [restaurantInfo, setRestaurantInfo] = useState({
		name: '',
		cuisine: '',
		address: '',
		restaurant_id: null,
	});

	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		console.log('REIVEW PAGE fetch data called');
		fetchRestaurantData();
		fetchRestaurantReviews();
	}, []);

	const getRestaurantId = () => {
		const url = window.location.search;
		const restaurantId = url.split('restaurant_id')[1].substring(1);
		return restaurantId;
	};

	const fetchRestaurantReviews = () => {
		const restaurant_reviews = RestaurantDataService.getRestaurantReviews(
			restaurantInfo.restaurant_id
		);
		setReviews(restaurant_reviews);
	};

	const fetchRestaurantData = () => {
		const restaurantId = getRestaurantId();
		RestaurantDataService.getRestaurantInfo(restaurantId).then((res) => {
			const restaurantAddress = `${res.data.document.address.building} ${res.data.document.address.street}, ${res.data.document.address.zipcode}`;
			setRestaurantInfo({
				name: res.data.document.name,
				address: restaurantAddress,
				cuisine: res.data.document.cuisine,
				restaurant_id: restaurantId,
			});
		});
	};

	return (
		<main className="container ReviewPage">
			<section className="restaurantInfo">
				<h1>{restaurantInfo.name} </h1>
				<h4>
					<strong>Cuisine: </strong> {restaurantInfo.cuisine}
				</h4>
				<h4 className="address-review">
					<strong>Address: </strong> {restaurantInfo.address}
				</h4>
				<div className="btn-location-review">
					<a
						class="form-submit-btn submit-btn-review"
						href="/restaurants/review/addReview"
					>
						Add Review
					</a>
				</div>
			</section>

			<section className="reviewBody">
				{reviews.length == 0 ? (
					<div>
						<article>
							<figure>
								<img
									src={noDataImg}
									width={200}
									height={200}
								></img>
							</figure>
							<text className="noPost-text">
								No&nbsp;&nbsp;Posts&nbsp;&nbsp;Yet
							</text>
						</article>
					</div>
				) : (
					<p>works</p>
				)}
			</section>
		</main>
	);
};

export default ReviewPage;

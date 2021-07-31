import express from 'express';
import RestaurantsCtrl from '../modelController/restaurants.controller.js';
import ReviewsCtrl from '../modelController/reviews.controller.js';

const RestaurantRouter = express.Router();

RestaurantRouter.route('/').get((req, res) => {
	console.log('get request to /');
	return RestaurantsCtrl.apiGetRestaurants(req, res);
});

RestaurantRouter.route('/review').get((req, res) => {
	console.log('get request to /review');
	return RestaurantsCtrl.apiGetRestaurantInfo(req, res);
	// let restaurant_reviews = res.json(
	// 	ReviewsCtrl.apiGetRestaurantReviews(req, res)
	// );
	// return res.json({ ...restaurant_info, ...restaurant_reviews });
});

// RestaurantRouter.route('/review')
// 	.post(ReviewsCtrl.apiPostReview)
// 	.put(ReviewsCtrl.apiUpdateReview)
// 	.delete(ReviewsCtrl.apiDeleteReview);

//This RestaurantRouter name does not have to match what's used in server.js
//The exported name from this file can be imported with any name in the server.js file (doesn't have to match)
export default RestaurantRouter;

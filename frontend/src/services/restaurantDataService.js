import restaurantAxios from './http/restaurantAxios.js';

class RestaurantDataService {
	getAll(page = 0) {
		return restaurantAxios.get(`?page=${page}`);
	}

	getRestaurantInfo(id = null) {
		if (id == null)
			return {
				error: 'restaurant id is null',
			};

		return restaurantAxios.get(`/review?restaurant_id=${id}`);
	}

	getRestaurantReviews(id = null) {
		return [];
	}
}

export default new RestaurantDataService();

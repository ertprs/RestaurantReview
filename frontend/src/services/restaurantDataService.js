import restaurantAxios from './http/restaurantAxios.js';

class RestaurantDataService {
	getAll(page = 0) {
		return restaurantAxios.get(`?page=${page}`);
	}
}

export default new RestaurantDataService();

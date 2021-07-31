export default class RestaurantsDAO {
	constructor() {
		this.restaurants;
		this.page = 3;
		this.restaurantsPerPage = 20;
	}
	static async injectDB(conn) {
		if (this.restaurants) {
			return;
		}
		try {
			this.restaurants = await conn
				.db(process.env.RESTREVIEWS_NS)
				.collection('restaurants');
		} catch (e) {
			console.error(
				'Unable to establish a collection handle in restaurantsDAO: ' +
					e
			);
		}
	}

	static async getRestaurants({
		filters = null,
		page = this.page,
		restaurantsPerPage = this.restaurantsPerPage,
	}) {
		let query = '';
		if (filters) {
			if ('name' in filters) {
				query = { $text: { search: filters['name'] } };
			} else if ('cuisine' in filters) {
				query = { cuisine: { $eq: filters['cuisine'] } };
			} else if ('zipcode' in filters) {
				query = { 'address.zipcode': { $eq: filters['zipcode'] } };
			}
		}
		let cursor;
		try {
			cursor = await this.restaurants.find(query);
		} catch (e) {
			console.error('Unable to issue find command: ' + e);
			return { restaurantsList: [], totalNumRestaurants: 0 };
		}

		const displayCursor = cursor
			.limit(restaurantsPerPage)
			.skip(restaurantsPerPage * page);

		try {
			const restaurantsList = await displayCursor.toArray();
			const totalNumRestaurants = await this.restaurants.countDocuments(
				query
			);
			return { restaurantsList, totalNumRestaurants };
		} catch (e) {
			console.error(
				'Unable to convert cursor to array or problem counting documents: ' +
					e
			);
			return { restaurantsList: [], totalNumRestaurants: 0 };
		}
	}

	static async getRestaurantInfo(id) {
		const id_filter = {
			restaurant_id: id,
		};

		try {
			let document = await this.restaurants.findOne(id_filter);
			console.log('doc: ', document);
			return { document };
		} catch (e) {
			console.log('find fail?: ', e);
		}
	}
}

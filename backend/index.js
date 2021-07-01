//connect to the db and start the server
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import UserDAO from './dao/userDAO.js';
dotenv.config();
// const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000;
const uri = process.env.RESTREVIEWS_DB_URI;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
	poolSize: 50,
	wtimeout: 2500,
	useNewUrlParse: true,
})
	.catch((err) => {
		console.error(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await RestaurantsDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);
		await UserDAO.injectDB(client);
		console.log('DB INJECTED');

		app.listen(port, () => {
			console.log('listening on port ' + port);
		});
		console.log('connected');
	});

import express from 'express';
import cors from 'cors';
import RestaurantRouter from './api/modelRouter/restaurants.route.js';
import UserRouter from './api/modelRouter/user.route.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/restaurants', RestaurantRouter);
app.use('/user', UserRouter);
app.use('*', (req, res) => {
	res.status(404).json({ ERROR: 'NOT FOUND' });
});

export default app;

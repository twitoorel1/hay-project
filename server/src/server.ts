import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectToDatabase } from './database/db';
import appRoutes from './routes';
import errorHandler from './errors/errorHandler';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
// import _ from 'lodash';

const app: Express = express();

// Time Zone
momentTimezone.tz.setDefault('Asia/Jerusalem');
moment.tz.setDefault('Asia/Jerusalem');

app.use(cors({ origin: '*' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(appRoutes);
app.use(errorHandler);

const PORT = 4000;
connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch(err => console.log(`Problems connecting to database: ${err.message}`));

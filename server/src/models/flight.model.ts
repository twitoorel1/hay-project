import queryDatabase from '../database/queryDatabase';

const databaseName = 'flights';

// CRUD
/*`
	Create = createOne = V
	Read = getAll = V
	Read = getById = V
	Update = updateOneById = V
	Delete = deleteOneById = V
` */

interface IFlights {
	id: number;
	flights_name_list_id: number;
	number: number;
	date_time: Date | any;

	// Statistic
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

class Flight {
	static async createOne(flights_name_list_id: number, number: number, date_time: Date) {
		const query = `INSERT INTO ${databaseName} (flights_name_list_id, number, date_time) VALUES (?, ?, ?);`;
		try {
			const results = await queryDatabase(query, [flights_name_list_id, number, date_time]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAll() {
		const query = `SELECT flights.id, CONCAT(flights_name_list.full_name, ' (', flights_name_list.short_name, ')') as flight_name, flights.number as flight_number, flights.date_time
		FROM ${databaseName} INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id;`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getById(id: number) {
		const query = `SELECT flights.id, CONCAT(flights_name_list.full_name, ' (', flights_name_list.short_name, ')') as flight_name, flights.number as flight_number, flights.date_time
		FROM ${databaseName} INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id WHERE flights.id = ?;`;

		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateOneById(id: number, body: IFlights) {
		const fieldToUpdate = Object.keys(body)
			.map(key => `${key} =?`)
			.join(', ');
		const valuesToUpdate = [...Object.values(body), id];
		const query = `UPDATE ${databaseName} SET ${fieldToUpdate} WHERE id = ?;`;
		try {
			const results = await queryDatabase(query, valuesToUpdate);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async deleteOneById(id: number) {
		const query = `DELETE FROM ${databaseName} WHERE id = ?;`;
		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default Flight;

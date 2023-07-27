import queryDatabase from '../database/queryDatabase';
import { FLIGHTS_NAME_LIST_FIELDS } from '../constants/models.constant';

const databaseName = 'flights_name_list';

// CRUD
/*`
	Create = createOne = V
	Read = getAll = V
	Read = getById = V
	Update = updateOneById = V
	Delete = deleteOneById = V
` */

interface IFlightsNameList {
	id: number;
	full_name: string;
	short_name: string;

	// Statistic
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

class FlightsNameList {
	static async createOne(full_name: string, short_name: string) {
		const query = `INSERT INTO ${databaseName} (full_name, short_name) VALUES (?, ?);`;
		try {
			const results = await queryDatabase(query, [full_name, short_name]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAll() {
		const query = `SELECT ${FLIGHTS_NAME_LIST_FIELDS} FROM ${databaseName};`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getById(id: number) {
		const query = `SELECT ${FLIGHTS_NAME_LIST_FIELDS} FROM ${databaseName} WHERE id = ?;`;

		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateOneById(id: number, body: IFlightsNameList) {
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

export default FlightsNameList;

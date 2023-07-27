import queryDatabase from '../database/queryDatabase';
import { EMPLOYEES_FIELDS } from '../constants/models.constant';

const databaseName = 'employees';

// CRUD
/*`
	Create = createOne = V
	Read = getAll = V
	Read = getById = V
	Update = updateOneById = V
	Delete = deleteOneById = V
` */

interface IEmployee {
	id: number;
	id_number: number;
	first_name: string;
	last_name: string;

	// Statistic
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

class Employee {
	static async createOne(id_number: number, first_name: string, last_name: string) {
		const query = `INSERT INTO ${databaseName} (id_number, first_name, last_name) VALUES (?, ?, ?);`;
		try {
			const results = await queryDatabase(query, [id_number, first_name, last_name]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAll() {
		const query = `SELECT ${EMPLOYEES_FIELDS} FROM ${databaseName}`;
		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getById(id: number) {
		const query = `SELECT ${EMPLOYEES_FIELDS} FROM ${databaseName} WHERE id = ?;`;
		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateOneById(id: number, body: IEmployee) {
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

export default Employee;

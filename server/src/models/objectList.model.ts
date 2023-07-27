import queryDatabase from '../database/queryDatabase';
import { OBJECTS_LIST_FIELDS } from '../constants/models.constant';

const databaseName = 'objects_list';

// CRUD
/*`
	Create = createOne = V
	Read = getAll = V
	Read = getById = V
	Update = updateOneById = V
	Delete = deleteOneById = V
` */

interface IObjectsList {
	id: number;
	name: string;
	price: number;

	// Statistic
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

class ObjectList {
	static async createOne(name: string, price: number) {
		const query = `INSERT INTO ${databaseName} (name, price) VALUES (?, ?);`;
		try {
			const results = await queryDatabase(query, [name, price]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAll() {
		const query = `SELECT ${OBJECTS_LIST_FIELDS} FROM ${databaseName};`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getById(id: number) {
		const query = `SELECT ${OBJECTS_LIST_FIELDS} FROM ${databaseName} WHERE id = ?;`;

		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateOneById(id: number, body: IObjectsList) {
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

export default ObjectList;

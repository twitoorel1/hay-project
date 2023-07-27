import queryDatabase from '../database/queryDatabase';

const databaseName = 'objects_size_list';

// CRUD
/*`
	Create = createOne = V
	Read = getAll = V
	Read = getById = V
	Update = updateOneById = V
	Delete = deleteOneById = V
` */

interface IObjectsSizeList {
	id: number;
	name: string;
	objects_list_id: number;

	// Statistic
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}

class ObjectsSizeList {
	static async createOne(name: string, objects_list_id: number) {
		const query = `INSERT INTO objects_size_list (name, objects_list_id) VALUES (?, ?);`;
		try {
			const results = await queryDatabase(query, [name, objects_list_id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAll() {
		const query = `SELECT objects_size_list.id, objects_size_list.name,
		objects_list.name as object_list_name, objects_list.price as object_list_price 
		FROM objects_size_list INNER JOIN objects_list ON objects_size_list.objects_list_id = objects_list.id;`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getById(id: number) {
		const query = `SELECT objects_size_list.id, objects_size_list.name,
		objects_list.name as object_list_name, objects_list.price as object_list_price 
		FROM objects_size_list INNER JOIN objects_list ON objects_size_list.objects_list_id = objects_list.id WHERE objects_size_list.id = ?;`;

		try {
			const results = await queryDatabase(query, [id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async updateOneById(id: number, body: IObjectsSizeList) {
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

export default ObjectsSizeList;

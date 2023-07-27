import queryDatabase from '../database/queryDatabase';

// const databaseName = 'objects';

// CRUD
/*`
	Create = createOne = V
	Read = getAllObjectsByQueryParams = V
	Read = getOneById = V
` */

interface ICreateObject {
	objects_list_id: number;
	object_number: number;
	objects_size_list_id: number;
	flights_id: number;
	users_id: number;

	employee_id: number[];
}

class ObjectModel {
	static async createOne(body: ICreateObject) {
		const placeholders = body.employee_id.map(id => '(?, ?, ?)').join(', ');
		const query1 = `INSERT INTO objects (objects_list_id, object_number, objects_size_list_id, flights_id, price, shift_list_id, users_id, status_list_id) VALUES
		(?, ?, ?, ?,
		(SELECT objects_list.price FROM objects_list WHERE objects_list.id = ?),
		(SELECT shift_list.id as shift FROM shift_list WHERE CURTIME() BETWEEN shift_list.entry_time AND shift_list.departure_time), ?, ?);`;
		const values1 = [body.objects_list_id, body.object_number, body.objects_size_list_id, body.flights_id, body.objects_list_id, body.users_id, 1];
		const query2 = `INSERT INTO employees_objects (objects_id, employees_id, flights_id) VALUES ${placeholders};`;
		const query3 = `UPDATE objects SET employees_numbers = (SELECT COUNT(*) FROM employees_objects WHERE employees_objects.objects_id = ?);`;
		try {
			const result1 = await queryDatabase(query1, values1);
			await Promise.all([
				queryDatabase(
					query2,
					body.employee_id.flatMap(id => [result1.insertId, id, body.flights_id])
				),
				queryDatabase(query3, [result1.insertId])
			]);
			return `success All Query Results (objects, employees_objects)  objects-last_insertId: ${result1.insertId}`;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	// Get All Objects By flight number and flight date time
	static async getAllObjectsByQueryParams(flight_number: number, flight_dateTime: string) {
		const query = `SELECT * FROM hay_boeing.objects_by_flight_number_and_datetime WHERE flight_number = ? AND flight_date_time = ?`;
		try {
			const results = await queryDatabase(query, [flight_number, flight_dateTime]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	// Get By ID
	static async getOneById(objectId: number) {
		const query = `SELECT * FROM hay_boeing.objects_by_flight_number_and_datetime WHERE id = ?`;
		try {
			const results = await queryDatabase(query, [objectId]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default ObjectModel;

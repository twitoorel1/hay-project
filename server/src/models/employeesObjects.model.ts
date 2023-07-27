import queryDatabase from '../database/queryDatabase';

// const databaseName = 'objects';

// CRUD
/*`
	Read = getAllByQueryParams = V
	Read = getOneById = V
` */

class EmployeesObjectsModel {
	static async getAllByQueryParams(firstName: string, lastName: string) {
		const query = `SELECT * FROM hay_boeing.employee_objects_list WHERE employee_first_name = ? AND employee_last_name = ?`;

		try {
			const result = await queryDatabase(query, [firstName, lastName]);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getOneById(id: number) {
		const query = `SELECT * FROM hay_boeing.employee_objects_list WHERE id = ?`;

		try {
			const result = await queryDatabase(query, [id]);
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default EmployeesObjectsModel;

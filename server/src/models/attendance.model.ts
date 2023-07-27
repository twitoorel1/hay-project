import queryDatabase from '../database/queryDatabase';

const databaseName = 'attendance';

// CRUD
/*`
	Create = createOneById = V
	Patch = exitTimeById = V
	Read = getAllListHoursById = V
	Read = getTotalHoursById = V
	Update = updateOneById =
	Delete = deleteOneById =
` */

class Attendance {
	static async createOneById(employees_id: number[]) {
		const valuesEmployees = employees_id.map(id => `(${id}, NOW())`).join(', ');

		const query = `INSERT INTO attendance (employees_id, entry_time) VALUES ${valuesEmployees};`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async exitTimeById(employees_id: number[]) {
		const idEmployees = employees_id.map(id => '?').join(', ');
		const query = `UPDATE ${databaseName} INNER JOIN employees ON attendance.employees_id = employees.id
		SET attendance.exit_time = NOW(), attendance.total_time = calculate_total_time(attendance.entry_time, NOW())
		WHERE employees.id IN (${idEmployees});`;

		try {
			const results = await queryDatabase(query, [...employees_id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAllListHoursById(employees_id: number) {
		const query = `SELECT * FROM attendance_list_hours WHERE employee_id = ?;`;

		try {
			const results = await queryDatabase(query, [employees_id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getTotalHoursById(employees_id: number) {
		const query = `SELECT * FROM attendance_total_hours WHERE employee_id = ?;`;

		try {
			const results = await queryDatabase(query, [employees_id]);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAllListHours() {
		const query = `SELECT * FROM attendance_list_hours;`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async getAllHours() {
		const query = `SELECT * FROM attendance_total_hours;`;

		try {
			const results = await queryDatabase(query);
			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default Attendance;

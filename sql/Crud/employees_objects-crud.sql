/* Add New employees_objects
-- req.body = 

INSERT INTO employees_objects (objects_id, employees_id, flights_id) VALUES (3, 2, 1)
*/


/* SELECT employees_objects BY firstName And lastName (Not Complete) 
	SELECT 
	employees_objects.id, objects_list.name as object_name, objects.object_number, objects_size_list.name as object_size_name,
	shift_list.name as shift, 
	CONCAT(users.first_name,' ', users.last_name) AS `manager_boeing`,
	employees.id as employee_id, CONCAT(employees.first_name,' ', employees.last_name) AS `employee_name`,
	flights.number as flight_number
	FROM ((employees_objects INNER JOIN objects ON employees_objects.objects_id = objects.id)
	INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
	INNER JOIN objects_size_list ON objects.objects_size_list_id = objects_size_list.id
	INNER JOIN shift_list ON objects.shift_list_id = shift_list.id
	INNER JOIN users ON objects.users_id = users.id)
	INNER JOIN employees ON employees_objects.employees_id = employees.id
	INNER JOIN flights ON employees_objects.flights_id = flights.id
	WHERE employees.first_name = 'orel' AND employees.last_name = 'twito'
    
	--- --- ---
	In View (employee_objects_list)
    SELECT * FROM hay_boeing.employee_objects_list WHERE employee_first_name = 'orel' AND employee_last_name = 'twito'
*/


-- Table
-- main - employees_objects
-- sub - objects => objects_list_id => objects_size_list_id, shift_list_id, users_id
-- sub - employees
-- sub - flights



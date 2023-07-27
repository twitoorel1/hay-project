SELECT 
employees_objects.id,
objects_list.name as object_name, 
objects.object_numer as object_number, 
objects_size_list.name as object_size_name, 
employees.first_name, employees.last_name, 
flights_name_list.full_name as flight_full_name, 
flights.number as flight_number, 
flights.date_time as flight_date_time, 
objects.date_time as object_date_time,
objects.manager_signed
FROM ((employees_objects INNER JOIN objects ON employees_objects.objects_id = objects.id) 
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
INNER JOIN objects_size_list ON  objects.objects_size_list_id = objects_size_list.id
INNER JOIN flights ON  objects.flights_id = flights.id
INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id
)
INNER JOIN employees ON employees_objects.employees_id = employees.id
WHERE employees.first_name = 'orel' 

-- INSERT INTO objects (objects_list_id, object_numer, objects_size_list_id, flights_id) VALUES (2, 8138, 2, 2)

-- Table
-- main employees_objects
-- sub objects => objects_list, objects_size_list, flights => flights_name_list
-- sub employees 
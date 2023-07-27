-- CREATE NEW object
-- LOCAL STORAGE - ( flights_id: 1(7585), users_id = 1(Hay Ginat) ) 
-- req.body ( objects_list_id = select, object_number = number, objects_size_list_id = select, flights_id = localstorage, users_id = localstorage, status_list_id = 1(automatic, for new))

-- INSERT INTO objects (objects_list_id, object_number, objects_size_list_id, flights_id, price, shift_list_id, users_id, status_list_id) VALUES 
-- (@objects_list_id := 1, @object_number := 24591, 1, @flights_id := 1, 
-- (SELECT objects_list.price FROM objects_list WHERE objects_list.id = @objects_list_id),
-- (SELECT shift_list.id as shift FROM shift_list WHERE CURTIME() BETWEEN shift_list.entry_time AND shift_list.departure_time),
-- 1, 1);
-- SET @last_insert_id := LAST_INSERT_ID(); 

-- -- -- req.body array.map[] ( employees_id )
-- INSERT INTO employees_objects (objects_id, employees_id, flights_id)
-- VALUES (@last_insert_id, 2, @flights_id), (@last_insert_id, 3, @flights_id);

-- UPDATE objects SET employees_numbers = (SELECT COUNT(*) FROM employees_objects WHERE objects_id = @last_insert_id);



/* SELECT OBJECTS BY flight number and flight date time

SELECT 
objects.id, objects.object_number as number, objects.employees_numbers, objects.manager_signed, objects.date_time, 
objects_list.name, objects_list.price, objects_size_list.name, 
flights_name_list.full_name as flight_name, 
flights.number as flight_number, flights.date_time as flight_date_time,
shift_list.name as shift, 
CONCAT(users.first_name, ' ', users.last_name) as manager_boeing,
status_list.value as status
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
INNER JOIN objects_size_list ON objects.objects_size_list_id = objects_size_list.id
INNER JOIN shift_list ON objects.shift_list_id = shift_list.id
INNER JOIN users ON objects.users_id = users.id
INNER JOIN status_list ON objects.status_list_id = status_list.id
WHERE flights.number = 7585 AND flights.date_time = '2023-07-18 15:56:24'

In View (objects_by_flight_number_and_datetime)
SELECT * FROM hay_boeing.objects_by_flight_number_and_datetime WHERE flight_number = 9652 AND flight_date_time = '2023-07-18 15:56:24'
*/


/* UPDATE OBJECT BY flight number and flight date time

req.body array.map[] ( all fields )
UPDATE objects SET object_number = 1 WHERE flights.number = 9652 AND flights.date_time = '2023-07-18 15:56:24';
*/


 
/* DELETE OBJECT BY flight number and flight date time
	DELETE objects FROM objects INNER JOIN flights ON objects.flights_id = flights.id WHERE flights.number = 9652 AND flights.date_time = '2023-07-18 15:56:24';
*/

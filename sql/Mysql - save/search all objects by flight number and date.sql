SELECT 
objects.id, objects.object_number as number, objects.employees_numbers, objects.manager_signed, objects.date_time, 
objects_list.name, objects_list.price, objects_size_list.name, 
flights_name_list.full_name as flight_name, 
flights.number as flight_number, flights.date_time as flight_date_time,
shift_list.name as shift, 
CONCAT(users.first_name, ' ', users.last_name) as manager_boeing 
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
INNER JOIN objects_size_list ON objects.objects_size_list_id = objects_size_list.id
INNER JOIN shift_list ON objects.shift_list_id = shift_list.id
INNER JOIN users ON objects.users_id = users.id
WHERE flights.number = 9652 AND flights.date_time = '2023-07-18 15:56:24'


-- Table
-- main - objects 
-- sub - objects_list
-- sub - objects_size_list
-- sub - flights => flights_name_list
-- sub - shift_list
-- sub - users





































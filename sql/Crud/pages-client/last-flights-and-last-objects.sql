-- מציג את כל הטיסות של החודש הנוכחי
-- מהחדש לישן עד 10 שורות לעמוד
/*
SELECT 
flights.id, flights.number, 
DATE_FORMAT(flights.date_time, '%d/%m/%Y') AS flight_time, flights_name_list.short_name,
(SELECT count(*) FROM objects WHERE objects.flights_id = flights.id) as objects_number
FROM flights 
INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id
LEFT JOIN objects ON flights.id = objects.flights_id
WHERE YEAR(flights.created_at) = YEAR(CURDATE()) AND MONTH(flights.created_at) = MONTH(CURDATE())
ORDER BY flights.date_time DESC LIMIT 10;



-- מציג את כל האמצעים של החודש הנוכחי
-- מהחדש לישן עד 10 שורות לעמוד
SELECT 
objects.id,
objects_list.name, objects.object_number, objects_size_list.name as object_size_name, shift_list.name as shift,
concat(flights_name_list.short_name, '-',flights.number) as flight_info,
DATE_FORMAT(flights.date_time, '%d/%m/%Y') AS flight_time,
status_list.name
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN status_list ON objects.status_list_id = status_list.id
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
INNER JOIN objects_size_list ON objects.objects_size_list_id = objects_size_list.id
INNER JOIN shift_list ON objects.shift_list_id = shift_list.id

*/
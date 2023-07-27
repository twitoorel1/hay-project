/*

-- כל הפלאטים בסכום של החודש הנוכחי
SELECT count(*)
FROM objects INNER JOIN objects_list ON objects.objects_list_id = objects_list.id WHERE objects_list.id = 1 AND objects_list.name = 'פלאט' AND
AND YEAR(objects.date_time) = YEAR(CURDATE())
AND MONTH(objects.date_time) = MONTH(CURDATE());

-- כל הקונטיינרים בחודש הנוכחי
SELECT count(*)
FROM objects INNER JOIN objects_list ON objects.objects_list_id = objects_list.id WHERE objects_list.id = 2 AND objects_list.name = 'קונטיינר' AND
AND YEAR(objects.date_time) = YEAR(CURDATE())
AND MONTH(objects.date_time) = MONTH(CURDATE());

-- כל העגלות בחודש הנוכחי
SELECT count(*)
FROM objects INNER JOIN objects_list ON objects.objects_list_id = objects_list.id WHERE objects_list.id = 3 AND objects_list.name = 'עגלה' AND
AND YEAR(objects.date_time) = YEAR(CURDATE())
AND MONTH(objects.date_time) = MONTH(CURDATE());



-- כל האובייקטים שבסטטוס לא נחתם בחודש הנוכחי
SELECT count(*) FROM objects INNER JOIN status_list ON objects.status_list_id = status_list.id WHERE status_list.name = 'pending'
AND YEAR(objects.date_time) = YEAR(CURDATE())
AND MONTH(objects.date_time) = MONTH(CURDATE());

-- כל האובייקטים שבסטטוס נחתם בחודש הנוכחי
SELECT count(*) FROM objects INNER JOIN status_list ON objects.status_list_id = status_list.id WHERE status_list.name = 'confirmed'
AND YEAR(objects.date_time) = YEAR(CURDATE())
AND MONTH(objects.date_time) = MONTH(CURDATE());



-- כל הפלאטים מהחדש לישן עד 5 שרות
SELECT
objects.id,
concat(flights_name_list.short_name, '-',flights.number) as flight_info,
DATE_FORMAT(flights.date_time, '%H:%i') AS flight_time,
objects.employees_numbers,
status_list.name as status
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN status_list ON objects.status_list_id = status_list.id
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
WHERE objects_list.id = 1 AND objects_list.name = 'פלאט'
ORDER BY flights.date_time DESC LIMIT 5;


-- כל הקונטיינרים מהחדש לישן עד 5 שורות
SELECT
objects.id,
concat(flights_name_list.short_name, '-',flights.number) as flight_info,
DATE_FORMAT(flights.date_time, '%H:%i') AS flight_time,
objects.employees_numbers,
status_list.name as status
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN status_list ON objects.status_list_id = status_list.id
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
WHERE objects_list.id = 2 AND objects_list.name = 'קונטיינר'
ORDER BY flights.date_time DESC LIMIT 5;


-- כל העגלות מהחדש לישן עד 5 שורות
SELECT
objects.id,
concat(flights_name_list.short_name, '-',flights.number) as flight_info,
DATE_FORMAT(flights.date_time, '%H:%i') AS flight_time,
objects.employees_numbers,
status_list.name as status
FROM ((objects INNER JOIN flights ON objects.flights_id = flights.id) INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id)
INNER JOIN status_list ON objects.status_list_id = status_list.id
INNER JOIN objects_list ON objects.objects_list_id = objects_list.id
WHERE objects_list.id = 3 AND objects_list.name = 'עגלה'
ORDER BY flights.date_time DESC LIMIT 5;

 */


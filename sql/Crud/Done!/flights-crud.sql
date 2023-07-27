-- Create New Flight
-- INSERT INTO flights (flights_name_list_id, number, date_time) VALUES (1, 84215, '2023-07-18 15:35:35')


-- Update Flight By ID
-- UPDATE flights SET number = 33351 WHERE id = 1


-- DELETE Flight By ID
-- DELETE FROM flights WHERE id = 1


/* Get All Flights - in View (flights_active)

SELECT 
flights.id, flights_name_list.full_name as flight_full_name, flights.number, flights.date_time
FROM flights 
INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id
*/

/* Get Flight By ID
SELECT 
flights.id, flights_name_list.full_name as flight_full_name, flights.number, flights.date_time
FROM flights 
INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id WHERE flights.id = 1
*/






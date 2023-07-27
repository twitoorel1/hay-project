SELECT 
flights.id, flights.number, flights_name_list.full_name as flight_full_name ,flights.date_time, flights.created_at, flights.updated_at
FROM flights
INNER JOIN flights_name_list ON flights.flights_name_list_id = flights_name_list.id


-- SELECT orders.id,
-- orders.created_at,
-- products.name as product_name, 
-- products.price as product_price,
-- products.quantity as product_quantity,
-- orders.amount,
-- orders.address,
-- categories.name as category_name
-- FROM
-- ((orders INNER JOIN products ON orders.product_id = products.id)
-- INNER JOIN categories ON products.category_id = categories.id) where id = 1
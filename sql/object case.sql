-- SELECT id,
--     CASE
--         WHEN CURTIME() BETWEEN '06:45:00' AND '15:45:00' THEN 'צהריים'
--         WHEN CURTIME() BETWEEN '15:45:00' AND '23:45:00' THEN 'לילה'
--         ELSE 'אחר'
--     END AS shift
-- FROM objects;

-- 
-- INSERT INTO objects 
-- (objects_list_id, object_numer, objects_size_list_id, flights_id, price, shift, users_id) VALUES
-- (@objects_list_id := 2, 24591, 1, 2,
-- (SELECT CASE 
-- 	WHEN objects_list.name = 'Container' THEN objects_list.price
--     WHEN objects_list.name = 'Obj 2' THEN objects_list.price
--     WHEN objects_list.name = 'Obj 3' THEN objects_list.price
--     ELSE 0
--     END FROM objects_list WHERE objects_list.id = @objects_list_id),
--     
--     CASE 
-- 		WHEN CURTIME() BETWEEN '06:45:00' AND '15:45:00' THEN 'בוקר'
--         WHEN CURTIME() BETWEEN '15:45:00' AND '23:45:00' THEN 'צהריים'
--         WHEN CURTIME() BETWEEN '23:45:00' AND '06:45:00' THEN 'לילה'
--         ELSE 'אחר'
-- 	END,
--     1
-- )


-- 
-- INSERT INTO objects (objects_list_id, object_numer, objects_size_list_id, flights_id, price, shift, users_id)
-- VALUES 
-- (@objects_list_id := 1, @object_numer := 24591, 1, @flights_id := 2, 
-- (SELECT 
-- 	CASE
-- 		WHEN objects_list.name IN ('Container', 'Obj 2', 'Obj 3') THEN objects_list.price
--         ELSE 0
-- 	END
-- FROM objects_list WHERE objects_list.id = @objects_list_id),

-- (SELECT
-- 	CASE
-- 		WHEN CURTIME() BETWEEN '06:45:00' AND '15:45:00' THEN 'בוקר'
--         WHEN CURTIME() BETWEEN '15:45:00' AND '23:45:00' THEN 'צהריים'
--         WHEN CURTIME() BETWEEN '23:45:00' AND '06:45:00' THEN 'לילה'
--         ELSE 'אחר'
-- 	END),
--     1
-- );

-- INSERT INTO employees_objects (objects_id, employees_id, flights_id)
-- VALUES (LAST_INSERT_ID(), 2, @flights_id);

-- UPDATE objects SET employees_numbers = (SELECT COUNT(*) FROM employees_objects WHERE objects_id = LAST_INSERT_ID()) WHERE id = 30


-- CREATE NEW object
-- LOCAL STORAGE - ( flights_id: 1(7585), users_id = 1(Hay Ginat) ) 
INSERT INTO objects (objects_list_id, object_number, objects_size_list_id, flights_id, price, shift_list_id, users_id)
VALUES 
(@objects_list_id := 1, @object_number := 24591, 1, @flights_id := 1, 
(SELECT objects_list.price FROM objects_list WHERE objects_list.id = @objects_list_id),
(SELECT shift_list.id as shift FROM shift_list WHERE CURTIME() BETWEEN shift_list.entry_time AND shift_list.departure_time),
1);
SET @last_insert_id := LAST_INSERT_ID(); 

INSERT INTO employees_objects (objects_id, employees_id, flights_id)
VALUES (@last_insert_id, 2, @flights_id), (@last_insert_id, 3, @flights_id);

UPDATE objects SET employees_numbers = (SELECT COUNT(*) FROM employees_objects WHERE objects_id = @last_insert_id);

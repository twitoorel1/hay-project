/* כניסת משמרת  -- array.map[] -- req.body = employees_id, entry_time

INSERT INTO attendance (employees_id, entry_time) VALUES (2, NOW()), (3, NOW()), (46, NOW());
*/

/* יציאת משמרת וחישוב שעות עבודה 
-- req.body = exit_time, 

UPDATE attendance
INNER JOIN employees ON attendance.employees_id = employees.id
SET attendance.exit_time = NOW(),
attendance.total_time = calculate_total_time(attendance.entry_time, NOW())
WHERE employees.id IN (2, 3, 46);
*/


/* מביא את כל שעות העבודה של העבודה לפי אידיי של עובד
SELECT 
attendance.id, attendance.entry_time, attendance.exit_time, attendance.total_time,
employees.id as employee_id
FROM attendance INNER JOIN employees ON attendance.employees_id = employees.id
WHERE employees.id = 2

--- --- ---
In View (attendance_list_hours)
SELECT * FROM attendance_list_hours WHERE employee_id = 2
*/

/* חישוב שעות עבודה לעובד לפי אידי של עובד -- req.body = employees.id

SELECT employees.id_number, employees.first_name, employees.last_name, SEC_TO_TIME(SUM(TIME_TO_SEC(total_time))) AS total_hours,
(SELECT COUNT(*) FROM attendance WHERE attendance.employees_id = employees.id) as total_days
FROM attendance
INNER JOIN employees ON attendance.employees_id = employees.id
WHERE employees.id = 2;

--- --- ---
In View (attendance_total_hours)
SELECT * FROM attendance_total_hours WHERE employee_id = 2
 */
 
 
 /* להביא את כל שעות העבודה של העובדים

In View (attendance_total_hours)
 SELECT * FROM attendance_list_hours
*/

 
 /* להביא את כל החישובים של העובדים של שעות עבודה

In View (attendance_total_hours)
 SELECT * FROM attendance_total_hours
*/
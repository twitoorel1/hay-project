-- CREATE DATABASE hay_boeing
-- USE hay_boeing

-- CREATE TABLE users (
-- 	id int(10) auto_increment,
--     fullName varchar(255) not null,
--     role enum('user', 'admin') not null default 'user',
--     email varchar(255) not null,
--     username varchar(255) not null,
--     password varchar(255) not null,
--     jwt_ac_token varchar(255) default NULL,
--     created_at TIMESTAMP default CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP default CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
--     primary key(id)
-- )

CREATE TABLE flights (
	id int(10) auto_increment,
    name varchar(255) not null,
    number varchar(100) not null,
    date datetime not null,
    tasks varchar(100),
	created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP ON  UPDATE CURRENT_TIMESTAMP,
    primary key(id)
)


-- CREATE TABLE employees (
-- 	id int(10) auto_increment,
--     firstName varchar(255) not null,
--     lastName varchar(255) not null,
--     tasks varchar(100),
--     primary key(id)
-- )

-- CREATE TABLE `types` (
-- 	id int(10) auto_increment,
--     name varchar(255) not null,
--     price varchar(255) not null,
--     primary key(id)
-- )

-- CREATE TABLE `types_size` (
-- 	id int(10) auto_increment,
--     name varchar(255) not null,
--     primary key(id)
-- )



CREATE TABLE tasks (
	id int(10) auto_increment,
    type_id int(10) not null,
    type_number int(100) not null,
    type_size_id int(10) not null,
    employees_numbers int(10) not null,
    date_time_doing datetime not null,
    shift varchar(255) not null,
    price varchar(255) not null,
    manager_signed varchar(255) default null,
	manager_boeing varchar(255) default null,
    primary key(id)
)
















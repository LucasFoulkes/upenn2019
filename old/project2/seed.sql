DROP DATABASE IF EXISTS `lucky_users_db`;
CREATE DATABASE `lucky_users_db`;

USE  lucky_users_db;

CREATE TABLE users
(
    userID int NOT NULL
    AUTO_INCREMENT primary key,
    username varchar
    (255) not null,
    password varchar
    (255) not null
);

    select *
    from users
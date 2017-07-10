DROP SCHEMA IF EXISTS smart_news;
CREATE SCHEMA smart_news;
USE smart_news;
CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(1024),
                    removed CHAR(1) DEFAULT 'N',
                    disabled CHAR(1) DEFAULT 'N',
                    PRIMARY KEY (id));

CREATE TABLE news   (id INT NOT NULL AUTO_INCREMENT,
                    title VARCHAR(1024),
                    description VARCHAR(1024),
                    link VARCHAR(1024),
                    author VARCHAR(1024),
                    PRIMARY KEY (id));

CREATE TABLE roles (id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    PRIMARY KEY (id));

CREATE TABLE users_roles (id INT NOT NULL AUTO_INCREMENT,
                          user_id INT NOT NULL,
                          role_id INT NOT NULL,
                          PRIMARY KEY (id));

CREATE TABLE users_news (id INT NOT NULL AUTO_INCREMENT,
                          user_id INT NOT NULL,
                          news_id INT NOT NULL,
                          PRIMARY KEY (id));


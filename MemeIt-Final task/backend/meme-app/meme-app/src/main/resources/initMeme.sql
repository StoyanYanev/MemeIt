CREATE DATABASE memes

CREATE TABLE meme(
                id INT GENERATED BY DEFAULT AS IDENTITY,
                title varchar,
                image text,
                PRIMARY KEY (id)
                );
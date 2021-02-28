CREATE DATABASE notes;

CREATE TABLE IF NOT EXISTS notes (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    link varchar(255),
    created TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    note_id serial NOT NULL,
    FOREIGN KEY (note_id)
      REFERENCES notes (id)
);
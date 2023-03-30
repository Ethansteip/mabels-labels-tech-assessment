-- schema/01_create_todos.sql
DROP TABLE IF EXISTS todos CASCADE;

-- CREATE TODOS
CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  comment VARCHAR(255),
  status VARCHAR(255) NOT NULL --set default value to todo
);
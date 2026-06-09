-- Crear la base de datos (Ejecutar esto primero por separado o en pgAdmin)
-- CREATE DATABASE practicadb;

-- Conectarse a la base de datos \c practicadb en psql

-- Crear tabla de tareas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO tasks (title, description) VALUES ('Preparar Entrevista', 'Estudiar conceptos de AWS y CI/CD');
INSERT INTO tasks (title, description) VALUES ('Levantar DB', 'Configurar PostgreSQL localmente o con Docker');

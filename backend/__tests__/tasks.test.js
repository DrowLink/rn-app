const request = require('supertest');
const app = require('../index');
const pool = require('../db');

describe('API de Tareas', () => {
  // Limpiar la conexión a la base de datos después de todas las pruebas
  afterAll(async () => {
    await pool.end();
  });

  it('GET /tasks debería retornar un array (lista de tareas) y un status 200', async () => {
    const response = await request(app).get('/tasks');
    
    // El servidor debe responder con éxito (200 OK)
    expect(response.statusCode).toBe(200);
    // La respuesta debe ser un Array (incluso si está vacío)
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Aquí se podrían agregar más tests: crear una tarea, borrar una tarea, etc.
});

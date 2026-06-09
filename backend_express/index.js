const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// RUTAS (Endpoints)

// 1. Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const allTasks = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Crear una tarea
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Actualizar el estado de una tarea (completada/no completada)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;
    const updateTask = await pool.query(
      'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *',
      [is_completed, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Eliminar una tarea
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Exportar la app para testing
module.exports = app;

// Iniciar servidor solo si este archivo se ejecuta directamente (no a través de tests)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

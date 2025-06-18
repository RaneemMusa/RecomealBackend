// routes/ingredients.js
import express from 'express';
import pgclient from '../db.js';
import adminAuth from '../middleware/adminAuth.js';


const router = express.Router();

// GET all ingredients (with category name)
router.get('/', async (req, res) => {
  try {
    const result = await pgclient.query(`
      SELECT ingredients.id, ingredients.name, categories.name AS category
      FROM ingredients
      JOIN categories ON ingredients.category_id = categories.id
      ORDER BY ingredients.id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

// GET ingredient by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT * FROM ingredients WHERE id = $1;', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Ingredient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching ingredient' });
  }
});

// POST create new ingredient
router.post('/', adminAuth, async (req, res) => {
  const { name, category_id } = req.body;
  try {
    const result = await pgclient.query(
      'INSERT INTO ingredients (name, category_id) VALUES ($1, $2) RETURNING *;',
      [name, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

// PUT update ingredient
router.put('/:id', adminAuth, async (req, res) => {
  const { name, category_id } = req.body;
  try {
    const result = await pgclient.query(
      'UPDATE ingredients SET name = $1, category_id = $2 WHERE id = $3 RETURNING *;',
      [name, category_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Ingredient not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating ingredient' });
  }
});

// DELETE ingredient
router.delete('/:id', adminAuth, async (req, res) =>  {
  try {
    const result = await pgclient.query('DELETE FROM ingredients WHERE id = $1 RETURNING *;', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Ingredient not found' });
    res.json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting ingredient' });
  }
});

export default router;

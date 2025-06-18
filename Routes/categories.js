// ✅ FULL CATEGORY ROUTES - /routes/categories.js
import express from 'express';
import pgclient from '../db.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// CREATE category
router.post('/', adminAuth, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pgclient.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// UPDATE category
router.put('/:id', adminAuth, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pgclient.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, req.params.id]
    );
    result.rows.length > 0 ? res.json(result.rows[0]) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE category
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const result = await pgclient.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    result.rows.length > 0 ? res.json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;

// POST /api/recipes
import express from 'express';
import pgclient from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { id, title, image_url, instructions } = req.body;

  if (!id || !title || !image_url || !instructions) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const existing = await pgclient.query('SELECT id FROM recipes WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      await pgclient.query(
        'INSERT INTO recipes (id, title, image_url, instructions) VALUES ($1, $2, $3, $4)',
        [id, title, image_url, instructions]
      );
    }
    res.status(200).json({ message: 'Recipe inserted or already exists' });
  } catch (err) {
    console.error('Error inserting recipe:', err);
    res.status(500).json({ error: 'Error inserting recipe' });
  }
});

export default router;

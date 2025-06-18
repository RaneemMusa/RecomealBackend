// Routes/saved_recipes.js
import express from 'express';
import pgclient from '../db.js';

const router = express.Router();

// POST /api/saved_recipes
router.post('/', async (req, res) => {
  const { user_id, recipe_id } = req.body;
  console.log("➡️ Received request body:", req.body);

  if (!user_id || !recipe_id) {
    return res.status(400).json({ error: 'Missing user_id or recipe_id' });
  }

  try {
    // ✅ Check if recipe exists in the recipes table
    const recipeResult = await pgclient.query(
      'SELECT title, image_url FROM recipes WHERE id = $1',
      [recipe_id] // FIXED: was incorrect before (was [id])
    );

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found in recipes table' });
    }

    const { title, image_url } = recipeResult.rows[0];

    // ✅ Check if already saved by user
    const exists = await pgclient.query(
      'SELECT * FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2',
      [user_id, recipe_id]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: 'Recipe already saved by this user' });
    }

    // ✅ Insert into saved_recipes
    const result = await pgclient.query(
  `INSERT INTO saved_recipes (user_id, recipe_id, title, image_url, saved_at)
   VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
  [user_id, recipe_id, title, image_url]
);


    console.log("✅ Recipe saved:", result.rows[0]);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('❌ Error saving recipe:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/saved_recipes/user/:id → get all recipes for user
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pgclient.query(
      'SELECT * FROM saved_recipes WHERE user_id = $1 ORDER BY saved_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching saved recipes:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/saved_recipes/:user_id/:recipe_id
router.delete('/:user_id/:recipe_id', async (req, res) => {
  const { user_id, recipe_id } = req.params;

  try {
    const result = await pgclient.query(
      'DELETE FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2 RETURNING *',
      [user_id, recipe_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Saved recipe not found' });
    }

    res.json({ message: 'Recipe removed successfully', removed: result.rows[0] });
  } catch (err) {
    console.error('❌ Error deleting recipe:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;

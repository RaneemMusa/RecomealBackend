import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db.js'; 

import userRoutes from './Routes/users.js';
import categoryRoutes from './Routes/categories.js';
import ingredientRoutes from './Routes/ingredients.js';
import savedRecipesRoutes from './Routes/saved_recipes.js';
import recipeRoutes from './Routes/recipes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/saved_recipes', savedRecipesRoutes);
app.use('/api/recipes', recipeRoutes);



// Home route
app.get('/', (req, res) => {
  res.send('RecoMeal Backend Running');
});

// Connect and start server
db.connect()
  .then(() => {
    console.log(' Connected to PostgreSQL');
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(' Database connection failed:', err);
  });

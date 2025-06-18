CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'user'
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name TEXT,
  category_id INT REFERENCES categories(id)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  instructions TEXT
);

CREATE TABLE recipe_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipes(id),
  ingredient_id INT REFERENCES ingredients(id),
  amount TEXT
);

CREATE TABLE saved_recipes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  recipe_id INT REFERENCES recipes(id),
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

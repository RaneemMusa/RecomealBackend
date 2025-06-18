



// import express from 'express';
// import pgclient from '../db.js';

// const router = express.Router();

// // ✅ SIGNUP
// router.post('/signup', async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     const exists = await pgclient.query(
//       'SELECT * FROM "Users" WHERE email = $1',
//       [email]
//     );
//     if (exists.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const result = await pgclient.query(
//       'INSERT INTO "Users" (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
//       [username, email, password, role || 'user']
//     );

//     res.status(201).json({ user: result.rows[0] });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ error: 'Error signing up' });
//   }
// });

// // ✅ LOGIN
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pgclient.query(
//       'SELECT id, username, email, role FROM "Users" WHERE email = $1 AND password_hash = $2',
//       [email, password]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.json({ user: result.rows[0] });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// export default router;


// import express from 'express';
// import pgclient from '../db.js';

// const router = express.Router();

// // ✅ SIGNUP
// router.post('/signup', async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     const exists = await pgclient.query(
//       'SELECT * FROM "Users" WHERE email = $1',
//       [email]
//     );
//     if (exists.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const result = await pgclient.query(
//       'INSERT INTO "Users" (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
//       [username, email, password, role || 'user']
//     );

//     res.status(201).json({ user: result.rows[0] });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ error: 'Error signing up' });
//   }
// });

// // ✅ LOGIN
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pgclient.query(
//       'SELECT id, username, email, role FROM "Users" WHERE email = $1 AND password_hash = $2',
//       [email, password]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.json({ user: result.rows[0] });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // GET user by ID (including full_name)
// router.get('/:id', async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const result = await pgclient.query(
//       'SELECT id, username, email, full_name FROM "Users" WHERE id = $1',
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Fetch user error:', err.message);
//     res.status(500).json({ error: 'Error fetching user data' });
//   }
// });

// // PUT update user (including full_name)
// router.put('/:id', async (req, res) => {
//   const userId = req.params.id;
//   const { username, email, full_name } = req.body;

//   try {
//     const result = await pgclient.query(
//       `UPDATE "Users"
//        SET username = $1, email = $2, full_name = $3
//        WHERE id = $4
//        RETURNING id, username, email, full_name`,
//       [username, email, full_name, userId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Update user error:', err.message);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// export default router;



// Routes/users.js
import express from 'express';
import pgclient from '../db.js';

const router = express.Router();

// ✅ SIGNUP
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const exists = await pgclient.query(
      'SELECT * FROM "Users" WHERE email = $1',
      [email]
    );
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const result = await pgclient.query(
      'INSERT INTO "Users" (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, password, role || 'user']
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Error signing up' });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pgclient.query(
      'SELECT id, username, email, role FROM "Users" WHERE email = $1 AND password_hash = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ✅ GET user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pgclient.query(
      'SELECT id, username, email FROM "Users" WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ UPDATE user info
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  try {
    const result = await pgclient.query(
      'UPDATE "Users" SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
      [username, email, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update user error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

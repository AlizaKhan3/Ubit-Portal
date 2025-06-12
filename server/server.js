// server.js
const express = require('express');
const mysql = require('mysql2/promise'); // using promise version
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// DB Config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'aaans2005',
  database: process.env.DB_NAME || 'dbms_project',
};

let db;

// Establish MySQL connection
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connected.');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();

// GET /courses (optional semester filter)
app.get('/courses', async (req, res) => {
  const semester = req.query.semester;
  console.log('➡️ Semester param:', semester);

  let query = 'SELECT * FROM courses';
  const params = [];

  if (semester) {
    query += ' WHERE semester = ?';
    params.push(semester);
  }

  try {
    console.log('🔍 Running query:', query, params);
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /resources
app.get('/resources', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM resources');
    res.json(rows);
  } catch (err) {
    console.error('❌ Resource fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// POST /add-course
app.post('/add-course', async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO courses (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.send('✅ Course added successfully');
  } catch (err) {
    console.error('❌ Add course error:', err);
    res.status(500).send('Failed to add course');
  }
});


app.get('/faculty', async (req, res) => {
  const { designation, search } = req.query;
  let sql = 'SELECT * FROM faculty WHERE 1=1';
  const values = [];
if (designation && designation !== 'all') {
  let titleMap = {
    lecturer: 'Lecturer',
    associate: 'Associate Professor',
    assistant: 'Assistant Professor'
  };
  sql += ' AND designation = ?';
  values.push(titleMap[designation]);
}
  try {
    const [rows] = await db.execute(sql, values);
    res.json(rows);
  } catch (err) {
    console.error('❌ Faculty fetch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/faculty/:id', async (req, res) => {
  const facultyId = req.params.id;

  try {
    const [teacherRows] = await db.query(
      `SELECT * FROM faculty WHERE id = ?`,
      [facultyId]
    );

    if (teacherRows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacher = teacherRows[0];

    const [courses] = await db.query(
      `SELECT * FROM course WHERE teacherName = ?`,
      [teacher.name]
    );

    res.json({ teacher, courses });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET /announcements
// app.get('/announcements', async (req, res) => {
//   try {
//     const [rows] = await db.execute('SELECT * FROM announcements ORDER BY createdAt DESC');
//     res.json(rows);
//   } catch (err) {
//     console.error('❌ Announcements fetch error:', err);
//     res.status(500).json({ error: 'Failed to fetch announcements' });
//   }
// });

app.get('/announcements', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        a.id,
        a.title,
        a.content,
        a.category,
        a.important,
        a.created_at AS createdAt,
        a.updated_at AS updatedAt,
        f.name AS authorName,
        f.photo AS authorPhoto
      FROM announcements a
      JOIN faculty f ON a.author_id = f.id
      ORDER BY a.created_at DESC
    `);
    console.log('✅ Announcements fetched:', rows);
    res.json(rows);
  } catch (err) {
    console.error('❌ Announcements fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});


// ====== SAVE FEEDBACK ======

app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;

  const query = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Insert Error:', err);
      return res.status(500).send('Server Error');
    }
    res.status(200).send('Feedback submitted successfully');
  });
});
// app.post('/feedback', async (req, res) => {
//   const { name, email, message, feedbackType } = req.body;

//   if (!name || !email || !message || !feedbackType) {
//     return res.status(400).json({ error: 'Please fill all the fields' });
//   }

//   try {
//     await db.promise().query(
//       'INSERT INTO feedback (name, email, message, feedbackType) VALUES (?, ?, ?, ?)',
//       [name, email, message, feedbackType]
//     );

//     res.status(201).json({ message: 'Feedback submitted successfully' });
//   } catch (err) {
//     console.error('Feedback Submission Error:', err);
//     res.status(500).json({ error: 'Server error while submitting feedback' });
//   }
// });


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5001;

const db = mysql.createPool({

app.use(cors());
app.use(express.json());
app.get('/api/memberLessons', (req, res) => {
    const sqlQuery = 'SELECT * FROM member';
    
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error fetching member data:', err);
        res.status(500).send({ error: 'Internal server error' });
      } else {
        console.log('Member data fetched successfully');
        res.status(200).send(result);
      }
    });
  });
app.post('/api/memberLesson', (req, res) => {
    const { name, phone, lesson, lessonDay, payDay, pay } = req.body;
    const sqlQuery = `INSERT INTO member (name, phone, lesson, lessonDay, payDay, pay) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, phone, lesson, lessonDay, payDay, pay];
  
    db.query(sqlQuery, values, (err) => {
      if (err) {
        console.error('Error saving data:', err);
        res.status(500).send({ error: 'Internal server error' });
      } else {
        console.log('Data saved successfully:', values);
        res.status(200).send({ message: 'Data saved successfully' });
      }
    });
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

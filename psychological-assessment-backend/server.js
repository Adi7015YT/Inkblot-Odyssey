// src/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./firebaseAdmin');
const db = require('./firebaseAdmin');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Unauthorized');
  }
};

app.post('/submit-responses', verifyToken, async (req, res) => {
  try {
    const { testType, responses } = req.body;
    await db.collection(testType).add({
      ...responses,
      userId: req.user.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).send('Responses submitted successfully');
  } catch (error) {
    console.error('Error submitting responses:', error);
    res.status(500).send('Error submitting responses');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

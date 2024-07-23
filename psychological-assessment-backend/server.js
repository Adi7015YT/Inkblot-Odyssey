// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require('./path/to/your/firebaseServiceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com'
});

const db = firebaseAdmin.firestore();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware to verify Firebase token
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
};

// Add a test result
app.post('/addTestResult', authenticateToken, async (req, res) => {
  const { userId, testResult } = req.body;
  try {
    await db.collection('testResults').add({ userId, testResult, timestamp: new Date() });
    res.status(200).send('Test result added successfully');
  } catch (error) {
    res.status(500).send('Error adding test result: ' + error.message);
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await firebaseAdmin.auth().getUserByEmail(email);
    // Implement your login logic here, such as generating a custom token
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
});

// Fetch test results for a user
app.get('/testResults', authenticateToken, async (req, res) => {
  const { userId } = req.query;
  try {
    const snapshot = await db.collection('testResults').where('userId', '==', userId).get();
    const results = snapshot.docs.map(doc => doc.data());
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send('Error fetching test results: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

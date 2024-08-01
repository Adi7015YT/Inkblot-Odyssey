// src/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_ADMIN_SDK_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`
});

module.exports = admin.firestore();

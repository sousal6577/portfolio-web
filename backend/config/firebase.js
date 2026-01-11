// ============================================================================
// FIREBASE CONFIG - Backend Configuration
// ============================================================================
const admin = require('firebase-admin');

// Verificar se já foi inicializado
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('../serviceAccountKey.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.database();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  auth,
  storage
};

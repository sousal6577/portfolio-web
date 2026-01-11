#!/usr/bin/env node
// ============================================================================
// CREATE ADMIN SCRIPT - Cria o primeiro usuário administrador
// ============================================================================
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const admin = require('firebase-admin');
const path = require('path');

// Firebase Admin initialization
const serviceAccount = require(path.resolve(__dirname, '../serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const auth = admin.auth();
const db = admin.database();

// Admin user configuration
const ADMIN_EMAIL = 'lgcdsousa@gmail.com';
const ADMIN_PASSWORD = 'Admin@2026!';
const ADMIN_NAME = 'Lucas Sousa';

async function createAdminUser() {
  console.log('🚀 Iniciando criação do usuário admin...\n');

  try {
    // Check if user already exists
    let user;
    try {
      user = await auth.getUserByEmail(ADMIN_EMAIL);
      console.log('⚠️  Usuário já existe no Firebase Auth');
      console.log(`   UID: ${user.uid}`);
      console.log(`   Email: ${user.email}`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        user = await auth.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          displayName: ADMIN_NAME,
          emailVerified: true
        });
        console.log('✅ Usuário criado com sucesso no Firebase Auth!');
        console.log(`   UID: ${user.uid}`);
        console.log(`   Email: ${user.email}`);
      } else {
        throw error;
      }
    }

    // Set custom claims for admin
    await auth.setCustomUserClaims(user.uid, { admin: true, role: 'admin' });
    console.log('✅ Claims de admin configuradas!');

    // Save admin info in database
    await db.ref(`users/${user.uid}`).set({
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: null
    });
    console.log('✅ Dados do admin salvos no banco!');

    console.log('\n========================================');
    console.log('🎉 ADMIN CRIADO COM SUCESSO!');
    console.log('========================================');
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔑 Senha: ${ADMIN_PASSWORD}`);
    console.log(`🔗 Acesse: http://localhost:5173/login`);
    console.log('========================================\n');

    return user;
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    throw error;
  }
}

// Run
createAdminUser()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

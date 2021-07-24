var admin = require("firebase-admin");

var serviceAccount = require("../assets/firebase-auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firebaseAuth = admin.auth();

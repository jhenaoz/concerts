var firebase = require("firebase");
const credentials = require('./credentials.json');
firebase.initializeApp({
  serviceAccount: credentials,
  databaseURL: "https://schoolmanagement-f7d49.firebaseio.com"
});

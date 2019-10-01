var admin = require("firebase-admin");
require("firebase/auth");

var serviceAccount = require("./schola-ff449-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://schola-ff449.firebaseio.com"
});

module.exports = {admin};

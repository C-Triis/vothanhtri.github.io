const admin = require("firebase-admin");
const path = require('path');

admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, 'shoe-name.json')),
    storageBucket: "shoe-name.appspot.com"
});

const bucket = admin.storage().bucket();
module.exports = {
    bucket,
};


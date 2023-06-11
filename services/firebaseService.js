const admin = require("firebase-admin");
const path = require('path');

admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, 'newbie-b80cd.json')),
    storageBucket: "newbie-b80cd.appspot.com"
});

const bucket = admin.storage().bucket();
module.exports = {
    bucket,
};


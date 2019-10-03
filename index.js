const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fireapi = require('./firebase-api');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

/** Routes **/

app.get('/hello', function(req, res) {
    res.send('Hello everybody!!!');
});

app.post('/signup', function(req, res) {
  fireapi.admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      disabled: false
    })
      .then(function(userRecord) {
        console.log('Successfully created new user:', userRecord.uid);
        setUserExtraInfo(userRecord);
      })
      .catch(function(error) {
        console.log('Error creating new user:', error);
      });

    res.send({"message": 'Usuário criado com sucesso!',"code": 200});
});

app.post('/updateuser', function(req, res) {
    fireapi.admin.auth().updateUser(req.body.uid, {
        displayName: 'Jane Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
      })
        .then(function(userRecord) {
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch(function(error) {
          console.log('Error updating user:', error);
        });
})

/** teste Será deletado */
app.post('/savedata', function(req, res) {
    let db = fireapi.admin.firestore();

    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
})

/*** Functions ***/

/**
 * Para ser usada na criação do usuário no Firebase Auth, para
 * criar o usuário no Firestore
 * @param {user from firebase} userRecord 
 */
function setUserExtraInfo(userRecord) {
    let db = fireapi.admin.firestore();
    let docRef = db.collection('users').doc(userRecord.uid);

    docRef.set({
        displayName: userRecord.displayName,
        email: userRecord.email
    });
}

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
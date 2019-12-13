import * as firebase from 'firebase';

  const totalUsers : Object = [];

  const config = {
    apiKey: 'AIzaSyAyXzMMZl66en3f0jrNTdeF9nqDU_SMw0o',
    authDomain: 'heroesapp-4b383.firebaseio.com',
    databaseURL: 'https://heroesapp-4b383.firebaseio.com',
    storageBucket: 'heroesapp-4b383.firebaseio.com'
  };

  firebase.initializeApp(config);

const productosDb = firebase.database().ref().child('productos')
const usuariosDb = firebase.database().ref().child('usuarios')

usuariosDb.orderByChild("id").on("child_added", function(snapshot) {
  totalUsers.push(snapshot.key)
});

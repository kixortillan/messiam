import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBLfbHU76E8Wqxz4zhYeFQqhCxp67ezqq4",
  authDomain: "messiam-c7cfa.firebaseapp.com",
  databaseURL: "https://messiam-c7cfa.firebaseio.com",
  projectId: "messiam-c7cfa",
  storageBucket: "messiam-c7cfa.appspot.com",
  messagingSenderId: "191123677556"
});

firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBIYn0VipbG4iV90p9-jFkQy2_A6QdK0Vg",
    authDomain: "hotelbooking-354d3.firebaseapp.com",
    databaseURL: "https://hotelbooking-354d3.firebaseio.com",
    projectId: "hotelbooking-354d3",
    storageBucket: "hotelbooking-354d3.appspot.com",
    messagingSenderId: "949362614525",
    appId: "1:949362614525:web:cbe6d8079b27c294b51e94",
    measurementId: "G-4QMG4B3Q1R"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
firebase.firestore();

  export default fire;
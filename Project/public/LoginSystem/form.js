// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyDxE1VD3LwK8AIqiVbuapV0L1w13Y3A2PA",
  authDomain: "form-cdf5a.firebaseapp.com",
  databaseURL: "https://form-cdf5a.firebaseio.com",
  projectId: "form-cdf5a",
  storageBucket: "form-cdf5a.appspot.com",
  messagingSenderId: "1058469667626",
  appId: "1:1058469667626:web:0df3ee888a859f7f0d3453"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp(){
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));

  alert("Signed Up");
}

function signIn(){
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
 }
 function signOut(){

 		auth.signOut();
 		alert("Signed Out");

 	}

auth.onAuthStateChanged(function(user){

  if(user){

   let email = user.email;
   alert("Active User " + email);
   alert("Hello " + email);

  }
 });

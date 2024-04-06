import './App.css';
import React, { useEffect, useState, setUser } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, provider } from './firebase/config'; // Import the functions you need from the SDKs you need
import { GoogleAuthProvider } from 'firebase/auth';

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setUser = result.user; // Set the user immediately after sign-in
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error);
  });
};

const signOutUser = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    setUser(null); // Set the user to null after sign-out
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <h1> Welcome, {user.displayName}!</h1>
            <button onClick={signOutUser}>Sign out</button>
          </div>
        ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </header>
    </div>
  );
}

export default App;
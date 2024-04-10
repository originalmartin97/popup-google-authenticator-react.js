import React, { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { signInWithGoogle, signOutUser } from './auth';

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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <h1>Welcome, {user.displayName}!</h1>
            <button onClick={() => signOutUser().then(setUser)}>Sign out</button>
          </div>
        ) : (
          <button onClick={() => signInWithGoogle().then(setUser)}>Sign in with Google</button>
        )}
      </header>
    </div>
  );
}

export default App;
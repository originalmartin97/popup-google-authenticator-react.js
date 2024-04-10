import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase/config';
import { GoogleAuthProvider } from 'firebase/auth';

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

export const signOutUser = () => {
  return signOut(auth).then(() => {
    // Sign-out successful.
    return null;
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};
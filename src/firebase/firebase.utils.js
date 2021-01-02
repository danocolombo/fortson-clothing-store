import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyA__nJiwml1-15OU3dm2CIiPG0IYkMMS-o',
    authDomain: 'fortsonclothes.firebaseapp.com',
    projectId: 'fortsonclothes',
    storageBucket: 'fortsonclothes.appspot.com',
    messagingSenderId: '385988075698',
    appId: '1:385988075698:web:5b7e694aa9c8d5a55a69ab',
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

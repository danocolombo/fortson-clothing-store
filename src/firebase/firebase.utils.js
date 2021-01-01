import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    // apiKey: 'AIzaSyA__nJiwml1-15OU3dm2CIiPG0IYkMMS-o',
    // authDomain: 'fortsonclothes.firebaseapp.com',
    // projectId: 'fortsonclothes',
    // storageBucket: 'fortsonclothes.appspot.com',
    // messagingSenderId: '385988075698',
    // appId: '1:385988075698:web:5b7e694aa9c8d5a55a69ab',
    apiKey: 'AIzaSyDw5iLfdUyipXMNAXRXQ6p4m9uP4w6jAYQ',
    authDomain: 'fclothes-dfca2.firebaseapp.com',
    projectId: 'fclothes-dfca2',
    storageBucket: 'fclothes-dfca2.appspot.com',
    messagingSenderId: '76138142067',
    appId: '1:76138142067:web:e40f2e60010c77c1dd4d06',
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

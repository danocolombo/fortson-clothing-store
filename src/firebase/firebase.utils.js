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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //-----------------------------------------
    //check if the user exists in our database
    //-----------------------------------------
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        //add the user to database
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    // give the userRef
    return userRef;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

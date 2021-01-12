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
//*********************************** */
// load data into firebase
//*********************************** */
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    //will use batch store to store each document of the collection
    const batch = firestore.batch();
    // loop over the objectsToAdd and stage to batch
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc(); //gets random firebase id for an entry in collection
        batch.set(newDocRef, obj); //now batch the new id with the current obj being looped over
    });
    //now need to send batch to execute, wait for it to be done, then return
    return await batch.commit();
};
//get the store items from Firebase, converting the returned array into an object
//-----------------------------------
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            //this will be object returned
            //need to add routeName that is no defined in Firebase
            //and provide the document id, that is at the collection level, not document
            //then also provide the title(string) and items (array) from firebase
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

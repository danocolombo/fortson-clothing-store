import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Checkout from './pages/checkout/checkout.component';
// the addCollectionAndDocuments function is for loading data into Firebase
import {
    auth,
    createUserProfileDocument,
    //addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
//this next import for just used to load data one time into firebase
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        // if adding data to firestore with function below, destructure mapstoprop to get data to add.
        // essentially add collectionsArray to const definition that follows.
        //const { setCurrentUser, collectionsArray } = this.props;
        const { setCurrentUser } = this.props;
        //create an auth listener
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    //print the user data stored in database for user
                    // NOTE snapshot does not have id
                    // console.log(snapShot.data());
                    //save the currentUser id and any data we have from db for user
                    //-------------------------------------------------------------
                    setCurrentUser(
                        {
                            id: snapShot.id,
                            ...snapShot.data(),
                        },
                        () => {
                            //we console log after async call of setstate, otherwise we might not get accurate state
                            // console.log(this.state);
                        }
                    );
                });
            }
            setCurrentUser(userAuth, () => {
                //we console log after async call of setstate, otherwise we might not get accurate state
                // console.log(this.state);
            });
            //the following function was used to load the initial data into firebase.
            // NOTE: we don't want to store all the values in the collectionArray, so we map
            //       over it and only define the values in the array we want to store in firebase
            //---- uncomment the next function to load the data when page is refreshed/loaded
            // addCollectionAndDocuments(
            //     'collections',
            //     collectionsArray.map(({ title, items }) => ({ title, items }))
            // );
        });
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />{' '}
                    {/* no exact because we will pass in items */}
                    <Route exact path='/checkout' component={Checkout} />
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    //collectionsArray: selectCollectionsForPreview, //only needed for adding data to firestore one time.
});
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

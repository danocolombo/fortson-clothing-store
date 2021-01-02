import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
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
            } else {
                setCurrentUser(userAuth, () => {
                    //we console log after async call of setstate, otherwise we might not get accurate state
                    // console.log(this.state);
                });
            }
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
                    <Route path='/shop' component={ShopPage} />
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
const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

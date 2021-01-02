import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }
    unsubscribeFromAuth = null;
    componentDidMount() {
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
                    this.setState(
                        {
                            currentUser: {
                                id: snapShot.id,
                                ...snapShot.data(),
                            },
                        },
                        () => {
                            //we console log after async call of setstate, otherwise we might not get accurate state
                            console.log(this.state);
                        }
                    );
                });
            } else {
                this.setState({ currentUser: userAuth }, () => {
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
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;

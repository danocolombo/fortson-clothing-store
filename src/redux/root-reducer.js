import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; // need to add persistStore for session
//for local storage
import storage from 'redux-persist/lib/storage';
//import sessionStorage from 'redux-persist/lib/storage/session';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//following config defines what persist stores. user is handled by firebase, so only will store user
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);

import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);
export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

//this returns the number of total items in the cart
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity,
            0
        )
);

//this returns the total cost of the cart
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
        (accumalatedPrice, cartItem) =>
            accumalatedPrice + cartItem.price * cartItem.quantity,
        0
    )
);

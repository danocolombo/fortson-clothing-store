import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';
//used to map the path string for collection to known number is data store

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) => collections[collectionUrlParam]
    )
);

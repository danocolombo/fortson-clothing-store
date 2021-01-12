import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionPage from '../collection/collection.component';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import {
    firestore,
    convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        //whenever collection is created or udpated, subcribe and get updates
        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            console.log(collectionsMap);
            //console.log(snapshot);
        });
        console.log('REBIT');
    }
    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionMap) =>
        dispatch(updateCollections(collectionMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);

import React from 'react';
//import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';

//import { selectCollections } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../preview-collection/collection-preview.component';

import './collections.overview.styles.scss'

function CollectionsOverview({ collection }){
    console.log("collection",collection)
return (
    <div className={'collections-overview'}>
        <CollectionPreview key={collection.id} collection={collection} />
    </div>
);
}

/*const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
})*/

export default CollectionsOverview
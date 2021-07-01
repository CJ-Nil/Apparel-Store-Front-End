import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({collection}) => (
    <div className='collection-preview' >
        <h1 className='title'>{collection.title.toUpperCase()}</h1>
        <div className='preview'>
            {collection.items
                .map((item) => (
                <CollectionItem key={item.p_code} item={item} />
            ))}
        </div>
    </div>
)

export default CollectionPreview
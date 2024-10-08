import React from 'react';
import './MetadataBox.css';
const MetadataBox = ({ meta, index, urls }) => {
    console.log(urls);

    return (
        <div>
            {`URL ${index + 1}: ${
                urls[index].length ? urls[index] : 'Empty URL'
            } `}
            {meta.error ? (
                <h1 className="error-message">Error: {meta.error}</h1>
            ) : (
                <div className="metadata-item">
                    <h2>{meta?.title || `Title ${index + 1}`}</h2>
                    <p>{meta?.description || 'No description'}</p>
                    {meta?.image && <img src={meta.image} alt="Preview" />}
                </div>
            )}
        </div>
    );
};

export default MetadataBox;

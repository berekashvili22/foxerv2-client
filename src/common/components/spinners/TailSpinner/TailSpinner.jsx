import React from 'react';
import PropTypes from 'prop-types';

const TailSpinner = ({ width = 10, height = 10, color = 'black' }) => {
    return (
        <div className="spinner-container" style={{ width: `${width}px`, height: `${height}px` }}>
            <div className="spinner-div" style={{ borderColor: `${color}` }}></div>
        </div>
    );
};

export default TailSpinner;

TailSpinner.propTypes = {
    width: PropTypes.oneOfType([PropTypes.undefined, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.undefined, PropTypes.number]),
    color: PropTypes.oneOfType([PropTypes.undefined, PropTypes.string])
};

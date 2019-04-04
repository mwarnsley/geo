import React from 'react';
import PlaceTwoTone from '@material-ui/icons/PlaceTwoTone';

export default ({ color, onClick, size }) => (
    <PlaceTwoTone onClick={onClick} style={{ color, fontSize: size }} />
);

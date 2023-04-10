import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function Location({ y, x, arr, ind, setlocation }) {
    function clicked() {
    }
    return (
        <div onClick={() => clicked()} className="home_board_location" style={{ top: y, left: x }}>
            <LocationOnIcon />
        </div>
    );
}

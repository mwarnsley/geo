import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import PinIcon from './PinIcon';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

// Setting the initial viewport of the map
const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12
};

const Map = ({ classes }) => {
    // using the state from the initial viewport to pass into react map gl
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    // Using the state again for getting the user position and setting the user position
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        getUserPosition();
    }, []);

    // Function for getting the user position when the component is mounted
    const getUserPosition = () => {
        // We need to check and make sure the geolocation is present on the window navigator
        if ('geolocation' in navigator) {
            // If there geolocation is present then we need to get the current position and set their position and viewport
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setViewport({ ...viewport, latitude, longitude });
                setUserPosition({ latitude, longitude });
            });
        }
    };
    return (
        <div className={classes.root}>
            <ReactMapGL
                height="calc(100vh - 64px)"
                onViewportChange={newViewport => setViewport(newViewport)}
                mapboxApiAccessToken="pk.eyJ1IjoibXdhcm5zbGV5IiwiYSI6ImNqYXl5NzhuazBqOWkycXFxdTBpbDV5OG8ifQ.P8swm7oARkaph-ZrhcyXLg"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                width="100vw"
                {...viewport}
            >
                <div className={classes.navigationControl}>
                    <NavigationControl
                        onViewportChange={newViewport =>
                            setViewport(newViewport)
                        }
                    />
                </div>
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon color="red" size={40} />
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
};

const styles = {
    root: {
        display: 'flex'
    },
    rootMobile: {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    navigationControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '1em'
    },
    deleteIcon: {
        color: 'red'
    },
    popupImage: {
        padding: '0.4em',
        height: 200,
        width: 200,
        objectFit: 'cover'
    },
    popupTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

export default withStyles(styles)(Map);

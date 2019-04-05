import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
import PinIcon from './PinIcon';
import Context from '../context';
import Blog from './Blog';
import differenceInMinutes from 'date-fns/difference_in_minutes';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import { useClient } from '../client';
import { CREATE_DRAFT, GET_PINS, UPDATE_DRAFT_LOCATION } from '../constants';
import { GET_PINS_QUERY } from '../graphql/queries';

// Setting the initial viewport of the map
const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12
};

const Map = ({ classes }) => {
    const client = useClient();
    const { state, dispatch } = useContext(Context);
    // using the state from the initial viewport to pass into react map gl
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    // Using the state again for getting the user position and setting the user position
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        getUserPosition();
    }, []);

    useEffect(() => {
        getPins();
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

    // Function to get the pins
    const getPins = async () => {
        const { getPins } = await client.request(GET_PINS_QUERY);
        dispatch({ type: GET_PINS, payload: getPins });
    };

    // Function that handles the map click
    const handleMapclick = ({ leftButton, lngLat }) => {
        if (!leftButton) return;
        if (!state.draft) {
            dispatch({ type: CREATE_DRAFT });
        }
        const [longitude, latitude] = lngLat;
        dispatch({
            type: UPDATE_DRAFT_LOCATION,
            payload: { longitude, latitude }
        });
    };

    /**
     * Function to get the new pin color
     * @param { Object } pin representing the pin being highlighted
     */
    const highlightNewPin = pin => {
        const isNewPin =
            differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
        return isNewPin ? 'limegreen' : 'darkblue';
    };
    return (
        <div className={classes.root}>
            <ReactMapGL
                height="calc(100vh - 64px)"
                onClick={handleMapclick}
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
                {state.draft && (
                    <Marker
                        latitude={state.draft.latitude}
                        longitude={state.draft.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon color="hotpink" size={40} />
                    </Marker>
                )}
                {state.pins.map(pin => (
                    <Marker
                        key={pin._id}
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon color={highlightNewPin(pin)} size={40} />
                    </Marker>
                ))}
            </ReactMapGL>
            <Blog />
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

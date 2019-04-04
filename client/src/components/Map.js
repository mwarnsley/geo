import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { withStyles } from '@material-ui/core/styles';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12
};

const Map = ({ classes }) => {
    // using the state from the initial viewport to pass into react map gl
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

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

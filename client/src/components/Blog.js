import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Context from '../context';
import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';
import PinContent from './Pin/PinContent';

const Blog = ({ classes }) => {
    const { state } = useContext(Context);
    const { currentPin, draft } = state;

    let BlogContent;
    if (!draft && !currentPin) {
        /**
         * If there is no draft content then we will show no content
         * If there is content then we display the create pin component
         */
        BlogContent = NoContent;
    } else if (draft && !currentPin) {
        BlogContent = CreatePin;
    } else if (!draft && currentPin) {
        BlogContent = PinContent;
    }
    return (
        <Paper className={classes.root}>
            <BlogContent />
        </Paper>
    );
};

const styles = {
    root: {
        minWidth: 350,
        maxWidth: 400,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center'
    },
    rootMobile: {
        maxWidth: '100%',
        maxHeight: 300,
        overflowX: 'hidden',
        overflowY: 'scroll'
    }
};

export default withStyles(styles)(Blog);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExploreIcon from '@material-ui/icons/Explore';
import Typography from '@material-ui/core/Typography';

const NoContent = ({ classes }) => (
    <div className={classes.root}>
        <ExploreIcon className={classes.icon} />
        <Typography
            align="center"
            color="textPrimary"
            component="h2"
            gutterBottom
            noWrap
            variant="h6"
        >
            Click on the map to add a pin
        </Typography>
    </div>
);

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: '80px'
    }
});

export default withStyles(styles)(NoContent);

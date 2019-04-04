import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MapIcon from '@material-ui/icons/Map';
import Typography from '@material-ui/core/Typography';

import Context from '../context';
import SignOut from './Auth/Signout';

const Header = ({ classes }) => {
    const { state } = useContext(Context);
    const { currentUser } = state;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.grow}>
                        <MapIcon className={classes.icon} />
                        <Typography
                            color="inherit"
                            component="h1"
                            noWrap
                            variant="h6"
                        >
                            GeoPins
                        </Typography>
                    </div>
                    {currentUser && (
                        <div className={classes.grow}>
                            <img
                                alt={currentUser.name}
                                className={classes.picture}
                                src={currentUser.picture}
                            />
                            <Typography color="inherit" noWrap variant="h5">
                                {currentUser.name}
                            </Typography>
                        </div>
                    )}
                    <SignOut />
                </Toolbar>
            </AppBar>
        </div>
    );
};

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing.unit,
        color: 'green',
        fontSize: 45
    },
    mobile: {
        display: 'none'
    },
    picture: {
        height: '50px',
        borderRadius: '90%',
        marginRight: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(Header);

import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';
import { SIGNOUT_USER } from '../../constants';

const Signout = ({ classes }) => {
    const { dispatch } = useContext(Context);

    // Function the signout the user from the application
    const onSignout = () => {
        dispatch({ type: SIGNOUT_USER });
    };
    return (
        <GoogleLogout
            onLogoutSuccess={onSignout}
            render={({ onClick }) => (
                <span className={classes.root} onClick={onClick}>
                    <Typography className={classes.buttonText} variant="body1">
                        Signout
                    </Typography>
                    <ExitToAppIcon className={classes.buttonIcon} />
                </span>
            )}
        />
    );
};

const styles = {
    root: {
        cursor: 'pointer',
        display: 'flex'
    },
    buttonText: {
        color: 'orange'
    },
    buttonIcon: {
        marginLeft: '5px',
        color: 'orange'
    }
};

export default withStyles(styles)(Signout);

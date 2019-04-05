import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FaceIcon from '@material-ui/icons/Face';

import CreateComment from '../Comment/CreateComment';
import Comments from '../Comment/Comments';

import format from 'date-fns/format';
import Context from '../../context';

const PinContent = ({ classes }) => {
    const { state } = useContext(Context);
    const { author, comments, content, createdAt, title } = state.currentPin;

    return (
        <div className={classes.root}>
            <Typography
                color="primary"
                component="h2"
                gutterBottom
                variant="h4"
            >
                {title}
            </Typography>
            <Typography
                className={classes.text}
                color="inherit"
                component="h3"
                gutterBottom
                variant="h6"
            >
                <FaceIcon className={classes.icon} /> {author.name}
            </Typography>
            <Typography
                className={classes.text}
                color="inherit"
                gutterBottom
                variant="subtitle2"
            >
                <AccessTimeIcon className={classes.icon} />{' '}
                {format(Number(createdAt), 'MMM Do, YYYY')}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
                {content}
            </Typography>
            <CreateComment />
            <Comments comments={comments} />
        </div>
    );
};

const styles = theme => ({
    root: {
        padding: '1em 0.5em',
        textAlign: 'center',
        width: '100%'
    },
    icon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withStyles(styles)(PinContent);

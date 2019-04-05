import React, { Fragment, useContext, useState } from 'react';
import { withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';

import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_COMMENT } from '../../constants';

const CreateComment = ({ classes }) => {
    const client = useClient();
    const { dispatch, state } = useContext(Context);
    const [comment, setComment] = useState('');

    // Function to handle submitting the comment
    const handleSubmitComment = async () => {
        const variables = { pinId: state.currentPin._id, text: comment };
        const { createComment } = await client.request(
            CREATE_COMMENT_MUTATION,
            variables
        );
        dispatch({ type: CREATE_COMMENT, payload: createComment });
        setComment('');
    };
    return (
        <Fragment>
            <form className={classes.form}>
                <IconButton
                    className={classes.clearButton}
                    disabled={!comment.trim()}
                    onClick={() => setComment('')}
                >
                    <ClearIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    multiline
                    placeholder="Add Comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                />
                <IconButton
                    className={classes.sendButton}
                    disabled={!comment.trim()}
                    onClick={handleSubmitComment}
                >
                    <SendIcon />
                </IconButton>
            </form>
            <Divider />
        </Fragment>
    );
};

const styles = theme => ({
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    clearButton: {
        padding: 0,
        color: 'red'
    },
    sendButton: {
        padding: 0,
        color: theme.palette.secondary.dark
    }
});

export default withStyles(styles)(CreateComment);

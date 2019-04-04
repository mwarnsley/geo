import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';

import Context from '../../context';
import { DELETE_DRAFT } from '../../constants';

const CreatePin = ({ classes }) => {
    const { dispatch } = useContext(Context);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    // Function that handles deleting the draft
    const handleDeleteDraft = () => {
        setTitle('');
        setImage('');
        setContent('');
        dispatch({ type: DELETE_DRAFT });
    };

    // Function that handles adding in the draft
    const handleSubmit = event => {
        event.preventDefault();
        console.log(title, image, content);
    };
    return (
        <form className={classes.form}>
            <Typography
                className={classes.alignCenter}
                component="h2"
                color="secondary"
                variant="h4"
            >
                <LandscapeIcon className={classes.iconLarge} /> Pin a location
            </Typography>
            <div>
                <TextField
                    label="Title"
                    name="title"
                    placeholder="Insert pin title"
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    accept="image/*"
                    className={classes.input}
                    id="image"
                    onChange={e => setImage(e.target.files[0])}
                    type="file"
                />
                <label htmlFor="image">
                    <Button
                        className={classes.button}
                        component="span"
                        size="small"
                        style={{ color: image && 'green' }}
                    >
                        <AddAPhotoIcon />
                    </Button>
                </label>
            </div>
            <div className={classes.contentField}>
                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    margin="normal"
                    multiline
                    onChange={e => setContent(e.target.value)}
                    rows="6"
                    variant="outlined"
                />
            </div>
            <div>
                <Button
                    className={classes.button}
                    color="primary"
                    onClick={handleDeleteDraft}
                    variant="contained"
                >
                    <ClearIcon className={classes.leftIcon} /> Discard
                </Button>
                <Button
                    className={classes.button}
                    color="secondary"
                    disabled={!title.trim() || !content.trim() || !image}
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                >
                    Submit <SaveIcon className={classes.rightIcon} />
                </Button>
            </div>
        </form>
    );
};

const styles = theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: theme.spacing.unit
    },
    contentField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%'
    },
    input: {
        display: 'none'
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    iconLarge: {
        fontSize: 40,
        marginRight: theme.spacing.unit
    },
    leftIcon: {
        fontSize: 20,
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        fontSize: 20,
        marginLeft: theme.spacing.unit
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginLeft: 0
    }
});

export default withStyles(styles)(CreatePin);

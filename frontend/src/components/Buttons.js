import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import BackIcon from '@material-ui/icons/ArrowBack';

import React from "react";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    loginButton: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        float: 'right'
    },
    backButton: {
        margin: theme.spacing(1),
        float: 'left',
        zIndex: 1000
    }
}));

export const SaveButton = ({onClick}) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={onClick}
        >
            <SaveIcon/> &nbsp;Save
        </Button>
    );
};

export const LoginButton = ({onClick}) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.loginButton}
            onClick={onClick}
        >
            Login
        </Button>
    );
};

export const BackButton = ({onClick, body}) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.backButton}
            onClick={onClick}
        >
           <BackIcon/> &nbsp; {body}
        </Button>
    );
};
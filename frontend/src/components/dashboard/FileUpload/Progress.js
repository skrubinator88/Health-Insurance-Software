import React from 'react'
import '../../../styles/Progress.css'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    ProgressBar: {
        width: '100%',
        height: 8,
        backgroundColor: 'rgb(183, 155, 229)',
        borderRadius: 5
    },
    Progress: {
        backgroundColor: 'rgba(103, 58, 183, 1)',
        height: '100%',
        margin: 0,
        borderRadius: 5
    }
}));
const Progress = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.ProgressBar}>
            <div
                className={classes.Progress}
                style={{ width: props.progress + '%' }}
            />
        </div>
    )
};

export default Progress
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import UpdateHealthPlan from "./UpdateHealthPlan/UpdateHealthPlan";

const useStyles = makeStyles(theme => ({
    healthPlanName: {
        fontSize: 32,
        fontWeight: 500,
        padding: theme.spacing(2, 2, 0),
        textAlign: 'left'
    },
    healthPlanDetails: {
        textAlign: 'left',
        fontSize: 16,
        padding: theme.spacing(2)
    },
    editButton: {
        bottom: theme.spacing(2),
        right: theme.spacing(5),
        position: 'absolute'
    }
}));

const EditButton = ({onClick}) => {
    const classes = useStyles();
    return (
        <Fab variant="round" size="small" color="primary" onClick={onClick} className={classes.editButton}><Icon>edit</Icon></Fab>
    )
}

const HealthPlanCard = ({healthPlan, getHealthPlan}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = async () => {
        setOpen(false);
        await getHealthPlan(healthPlan.id)
    };
    return (
            <Paper elevation={2}>
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <Box>
                        <UpdateHealthPlan healthPlanId={healthPlan.id} close={handleClose}/>
                    </Box>
                </Dialog>
                <span className={classes.healthPlanName}>{healthPlan.name}</span>
                <p className={classes.healthPlanDetails}>
                    <b>Type</b>: {healthPlan.type},
                    <br/>
                    <b>Deductible</b>: {healthPlan.deductible},
                    <br/>
                    <b>Description</b>: {healthPlan.description},
                    <br/>
                    <b>Premium</b>: {healthPlan.premium},
                </p>
                <EditButton onClick={handleClickOpen}/>
            </Paper>
    );
};

export default HealthPlanCard;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import UpdatePatient from "./UpdatePatient/UpdatePatient";

const useStyles = makeStyles(theme => ({
    patientName: {
        fontSize: 32,
        fontWeight: 500,
        padding: theme.spacing(2, 2, 0),
        textAlign: 'left'
    },
    patientDetails: {
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

const PatientCard = ({patient, getPatient}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = async () => {
        setOpen(false);
        await getPatient(patient.id)
    };
    return (
            <Paper elevation={2}>
                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <Box>
                        <UpdatePatient patientId={patient.id} close={handleClose}/>
                    </Box>
                </Dialog>
                <span className={classes.patientName}>{patient.name}</span>
                <p className={classes.patientDetails}>
                    <b>Address</b>: {patient.street1 ? patient.street1 : "N/A"}
                    <br/>
                    <b>Phone</b>: {patient.telephone1 ? patient.telephone1 : "N/A"}
                    <br/>
                    <b>Sex</b>: {patient.sex ? patient.sex : "N/A"}
                    <br/>
                    <b>Date of Birth</b>: {!!patient.birthdate ? new Date(patient.birthdate).toLocaleDateString("en-US") : "N/A"}
                    <br/>
                    <b>Height</b>: {patient.height ? patient.height : "N/A"}
                    <br/>
                    <b>Weight</b>: {patient.weight ? patient.weight : "N/A"}
                    <br/>
                    <br/>
                    <b>Insurance Type</b>: {patient.insuranceType ? patient.insuranceType.toUpperCase() : "N/A"}
                    <br/>
                    <b>Insurance #</b>: {patient.insuranceNo ? patient.insuranceNo : "N/A"}
                </p>
                <EditButton onClick={handleClickOpen}/>
            </Paper>
    );
};

export default PatientCard;
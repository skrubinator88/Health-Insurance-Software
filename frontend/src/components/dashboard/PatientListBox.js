import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    customerListBox: {

    },
    customerCard: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
        textAlign: 'left',
        cursor: 'pointer'
    },
    cardName: {
        fontWeight: 600
    },
    cardCode: {
        float: 'right'
    },
    cardContents: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
        lineHeight: 1.7
    },
    container: {
        marginTop: theme.spacing(5),
    },
    addPatient: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        textDecoration: 'none',
        backgroundColor: '#3CBC3C',
        color: 'white'
    },
    linkWrapper: {
        textDecoration: 'none'
    },
    addPatientIcon: {
        fontSize: 26,
    },
    addPatientText: {
        fontSize: 25,
    },
    progress: {
        float: 'center',
        paddingTop: theme.spacing(1)
    }
}));

const PatientListBox = (props) => {
    const classes = useStyles();
    let myRef = useRef(null);

    const [hasMore, setHasMore] = useState(props.hasMore);
    const [patients, setPatients] = useState(props.patients);

    useEffect(() => {
        setHasMore(props.hasMore);
        setPatients(props.patients);
        document.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('wheel', handleScroll);
        };
    }, [props.hasMore, props.patients]);

    const handleScroll = debounce(async (e) => {
        if (!hasMore) {
           return
        }
        const node = myRef.current;
        if(node) {
            let scrollTop = node.scrollTop;
            let clientHeight = node.clientHeight;
            let scrollHeight = node.scrollHeight;
            let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            if(scrolledToBottom) {
                await props.loadMorePatients()
            }
        }
    }, 150);

    return (
        <Box >
            <Container className={classes.container} maxWidth={'sm'} >
                <Box ref={myRef} style={{maxHeight: 450, overflowY: 'scroll', border: '2px solid #DCDCDC', marginTop: 10, paddingBottom: 60}}>
                    {patients.length > 0 ? patients.map((patient, index) => {
                        return (
                            <Link to={`/dashboard/patient/${patient.id}`} className={classes.linkWrapper}>
                                <CustomerCard name={patient.name}
                                              streetAddress1={patient.street1}
                                              streetAddress2={patient.street2}
                                              city={patient.city}
                                              state={patient.state}
                                              zipCode={patient.zipCode}
                                              phone1={patient.telephone1}
                                              phone2={patient.telephone2}
                                />
                            </Link>
                        );
                    }) : <Box>
                        <h3>Patient name does not match any records</h3>
                        <Link to='/dashboard/addUser' className={classes.linkWrapper}><Paper className={classes.addPatient}>
                            <Typography variant={'h4'}>
                                <Icon className={classes.addPatientIcon}>person_add</Icon> &nbsp; <span className={classes.addPatientText}>Add new patient</span>
                            </Typography>
                        </Paper></Link>
                    </Box> }
                    {props.isFetching ? <div className={classes.progress}>
                        <CircularProgress />
                    </div> : null}

                </Box>
            </Container>
        </Box>
    );
};

const CustomerCard = ({ name, code, streetAddress1, streetAddress2, city, state, zipCode, phone1, phone2}) => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.customerCard} elevation={1}>
                <Typography variant="h6">
                    <span className={classes.cardName}>{name}</span>
                </Typography>
                <Divider variant={'middle'}/>
                <div className={classes.cardContents}>
                    <div>
                       <p>
                           <b>Address1:</b> {streetAddress1 ? streetAddress1 : "N/A"} <br/>
                           <b>Address2:</b> {streetAddress2 ? streetAddress2 : "N/A"}<br/>
                       </p>
                    </div>
                    <div>
                        <p>
                            <b>City:</b> {city ? city : "N/A"} <br/> <b>State:</b> {state ? state : "N/A"} <br/> <b>ZipCode:</b> {zipCode ? zipCode : "N/A"} <br/>
                            <b>Telephone:</b> {phone1 ? phone1 : "N/A"}<br/>
                            <b>Telephone 2:</b> {phone2 ? phone2 : "N/A"}
                        </p>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default PatientListBox;
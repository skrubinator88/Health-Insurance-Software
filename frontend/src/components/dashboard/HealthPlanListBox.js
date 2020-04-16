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

const HealthPlanListBox = (props) => {
    const classes = useStyles();
    let myRef = useRef(null);

    const [hasMore, setHasMore] = useState(props.hasMore);
    const [healthPlans, setHealthPlans] = useState(props.healthPlans);

    useEffect(() => {
        setHasMore(props.hasMore);
        setHealthPlans(props.healthPlans);
        document.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('wheel', handleScroll);
        };
    }, [props.hasMore, props.healthPlans]);

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
                await props.loadMore()
            }
        }
    }, 150);

    return (
        <Box >
            <Container className={classes.container} maxWidth={'sm'} >
                <Box ref={myRef} style={{maxHeight: 450, overflowY: 'scroll', border: '2px solid #DCDCDC', marginTop: 10, paddingBottom: 60}}>
                    {healthPlans.length > 0 ? healthPlans.map((healthPlan, index) => {
                        if(healthPlan) {
                            return (
                                <Link to={`/dashboard/healthPlan/${healthPlan.id}`} className={classes.linkWrapper}>
                                    <CustomerCard name={healthPlan.name}
                                                  type={healthPlan.type}
                                                  description={healthPlan.description}
                                                  deductible={healthPlan.deductible}
                                                  premium={healthPlan.premium}
                                    />
                                </Link>
                            );
                        }
                    }) : <Box>
                        <h3>No Health Plan could be found</h3>
                        <Link to='/dashboard/addHealthPlan' className={classes.linkWrapper}><Paper className={classes.addPatient}>
                            <Typography variant={'h4'}>
                                <Icon className={classes.addPatientIcon}>person_add</Icon> &nbsp; <span className={classes.addPatientText}>Add new health plan</span>
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

const CustomerCard = ({ name, type, deductible, description, premium}) => {
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
                           <b>Type:</b> {type ? type : "N/A"} <br/>
                           <b>Deductible:</b> {deductible ? deductible : "N/A"}<br/>
                           <b>Description:</b> {description ? description : "N/A"}<br/>
                       </p>
                    </div>
                    <div>
                        <p>
                            <b>Premium:</b> {premium ? premium : "N/A"}<br/>
                        </p>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default HealthPlanListBox;

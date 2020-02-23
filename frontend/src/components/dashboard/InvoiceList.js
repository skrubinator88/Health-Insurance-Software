import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import Link from 'react-router-dom/Link';
import debounce from "lodash.debounce";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import EditInvoice from "./EditInvoice/EditInvoice";
import {COMPLETE_AND_DELIVERED} from "../../Globals";

const useStyles = makeStyles(theme => ({
    customerListBox: {

    },
    customerCard: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
        textAlign: 'left',
    },
    emptyInvoices: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
        textAlign: 'center',
    },
    cardName: {
        fontWeight: 500,
        fontSize: 14
    },
    cardCode: {
        float: 'right',
        fontSize: 14
    },
    cardContents: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14
    },
    customerList: {
        marginTop: theme.spacing(5)
    },
    addCustomer: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        textDecoration: 'none'
    },
    linkWrapper: {
        textDecoration: 'none'
    },
    addCustomerIcon: {
        fontSize: 26,
    },
    addCustomerText: {
        fontSize: 25
    },
    invoiceListTitle: {
        fontSize: 24,
        textColor: '#696969',
        fontWeight: 500,
        textAlign: 'left'
    },
    listItem: {
        position: 'relative'
    },
    progress: {
        float: 'center',
        padding: theme.spacing(1)
    },
    editButton: {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        position: 'absolute'
    }
}));

const InvoiceList = (props) => {

    const [hasMoreInvoices, setHasMoreInvoices] = useState(props.hasMoreInvoices);
    const [invoices, setInvoices] = useState(props.invoices);
    const [openedInvoice, setOpenedInvoice] = useState("");

    const classes = useStyles();
    let myRef = useRef(null);
    const handleClickOpen = (invoiceId) => {
        setOpenedInvoice(invoiceId);
    };
    const handleClose = async () => {
        setOpenedInvoice("");
        await props.getInvoices()
    };
    useEffect(() => {
        setHasMoreInvoices(props.hasMoreInvoices);
        setInvoices(props.invoices);
        document.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('wheel', handleScroll);
        };
    }, [props.hasMoreInvoices, props.invoices]);

    const handleScroll = debounce(async (e) => {
        if (!hasMoreInvoices) {
            return
        }
        const node = myRef.current;
        if(node && openedInvoice === "") {
            let scrollTop = node.scrollTop;
            let clientHeight = node.clientHeight;
            let scrollHeight = node.scrollHeight;
            let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
            if(scrolledToBottom) {
                await props.loadMoreInvoices()
            }
        }
    }, 150);

    return (
        <Box>
            <Container className={classes.customerList} >
                <h1 className="subtitle-text" >Invoices</h1>
                <Link to={`/dashboard/patient/${props.patient.id}/addInvoice`} className={classes.linkWrapper}>
                    <Paper className={classes.addCustomer}>
                        <Typography variant={'h4'}>
                            <Icon className={classes.addCustomerIcon}>receipt</Icon> &nbsp; <span className={classes.addCustomerText}>Create new invoice</span>
                        </Typography>
                    </Paper>
                </Link>
                <Box ref={myRef} style={{maxHeight: 600, minHeight: 200, overflow: 'auto', marginTop: 10, paddingBottom: 50}}>
                    {invoices.length > 0 ? invoices.map((invoice, index) => {
                        return (
                            <InvoiceListItem
                                patient={props.patient}
                                invoice={invoice}
                                onClick={props.onClick}
                                onClickEdit={handleClickOpen}
                                onClose={handleClose}
                                open={openedInvoice}
                            />
                        );
                    }) : <Paper className={classes.emptyInvoices}>
                        <p>No Invoices Found</p>
                    </Paper>}
                    {props.isFetching ? <div className={classes.progress}>
                        <CircularProgress />
                    </div> : null}
                </Box>
            </Container>
        </Box>
    );
};

const InvoiceListItem = ({patient, invoice, onClick, onClickEdit, onClose, open}) => {
    const classes = useStyles();
    const handleEditButton = (e) => {
        e.preventDefault();
        onClickEdit(invoice.id);
    }
    return (
        <div className={classes.listItem}>
            <Dialog aria-labelledby="customized-dialog-title" open={open === invoice.id}>
                <Box>
                    <EditInvoice invoiceId={invoice.id} patient={patient} close={onClose}/>
                </Box>
            </Dialog>
            <Paper className={classes.customerCard} elevation={1}>
                <Typography variant="h6">
                    <span className={classes.cardName}>Patient Name:&nbsp;{patient.name}</span> <span className={classes.cardCode}>Invoice #:{invoice.invoiceNo}</span>
                    {invoice.status !== COMPLETE_AND_DELIVERED ? <Fab variant="round" size="small" color="primary" onClick={handleEditButton} className={classes.editButton}><Icon>edit</Icon></Fab> : null}
                </Typography>
                <Divider variant={'middle'}/>
                <div className={classes.cardContents}>
                    <div>
                       <p>
                           <b>Salesman:</b> {invoice.salesman ? invoice.salesman.toUpperCase() : "N/A"} <br/>
                           <b>Insurance Type:</b> {patient.insuranceType ? patient.insuranceType.toUpperCase() : "N/A"}<br/>
                           <b>Status:</b> {invoice.status ? invoice.status.toUpperCase() : "N/A"}
                       </p>
                    </div>
                    <div>
                        <p>
                            <b>Date:</b> {new Date(invoice.date).toLocaleDateString("en-US")} <br/>
                            <b>Parts:</b> {invoice.items.length}
                        </p>
                    </div>
                </div>
                <Divider variant="middle"/>
                <Button onClick={() => {onClick(invoice.id)}}>View Details</Button>
            </Paper>
        </div>
    );
};

export default InvoiceList;
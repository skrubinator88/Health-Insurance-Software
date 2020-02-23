import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog';
import Upload from "./FileUpload/Upload";
import debounce from "lodash.debounce";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    documentCard: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
        textAlign: 'left',
        cursor: 'pointer'
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
        textDecoration: 'none',
        pointer: 'cursor'
    },
    addDocumentIcon: {
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
    progress: {
        float: 'center',
        padding: theme.spacing(1)
    },
    dialog: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
}));

const DocumentList = (props) => {

    const [hasMore, setHasMore] = useState(props.hasMoreDocuments);
    const [documents, setDocuments] = useState(props.documents);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = async () => {
        setOpen(false);
        await props.getDocuments(props.patient.id)
    };
    const classes = useStyles();
    let myRef = useRef(null);

    useEffect(() => {
        setHasMore(props.hasMoreDocuments);
        setDocuments(props.documents);
        document.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('wheel', handleScroll);
        };
    }, [props.hasMoreDocuments, props.documents]);

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
    }, 350);

    return (
        <Box>
            <Container className={classes.customerList} >
                <h1 className="subtitle-text">Documents</h1>
                <Paper variant="outlined" onClick={handleClickOpen} className={classes.addCustomer}>
                    <Typography variant={'h4'}>
                        <Icon className={classes.addDocumentIcon}>description</Icon> &nbsp; <span className={classes.addCustomerText}>Upload Patient Document</span>
                    </Typography>
                </Paper>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <Box>
                        <Upload className={classes.dialog} patientId={props.patient.id} />
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </Box>
                </Dialog>
                <Box ref={myRef} style={{maxHeight: 600, minHeight: 200, overflow: 'auto', marginTop: 10}}>
                    {documents.length > 0 ? documents.map((document, index) => {
                        return (
                            <DocumentListItem
                                onClick={props.onClick}
                                documentName={document.documentName}
                                uploadDate={new Date(document.createdAt)}
                                id={document.id}
                            />
                        );
                    }) : <Paper className={classes.emptyInvoices}>
                        <p>No Documents Found</p>
                    </Paper>}
                    {props.isFetching ? <div className={classes.progress}>
                        <CircularProgress />
                    </div> : null}
                </Box>
            </Container>
        </Box>
    );
};

const DocumentListItem = ({documentName, documentType, uploadDate, id, onClick}) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.documentCard} elevation={1} onClick={() => {onClick(id)}}>
                <div className={classes.cardContents}>
                    <div>
                       <p>
                           <b>Name:</b> {documentName ? documentName.toUpperCase() : "N/A"}<br/>
                       </p>
                    </div>
                    <div>
                        <p>
                            <b>Upload Date:</b> {uploadDate.toLocaleDateString("en-US")} <br/>
                        </p>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default DocumentList;
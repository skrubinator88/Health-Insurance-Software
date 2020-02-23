import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Document, Page, pdfjs } from 'react-pdf';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../../styles/generateDocument.css';
import { makeStyles } from '@material-ui/core/styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    toolbar: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row'
    },
    menuButton: {
        color: 'white'
    },
    document: {
        float: 'center'
    }
}));
const GenerateDocument = (props) => {
    const onDocumentLoad = (e) => {
        console.log('success');
    };
    const [document, setDocument] = useState(props.document);
    const [counter, setCounter] = useState(props.counter);
    const [pageNo, setPageNo] = useState(1);
    const classes = useStyles();
    useEffect(() => {
        console.log(props.document)
        setCounter(props.counter);
        setDocument(props.document);
    }, [props.document, props.counter]);

    const handleNextPage = () => {
        setPageNo(pageNo + 1);
    };
    const handlePreviousPage = () => {
        if(pageNo > 1)
            setPageNo(pageNo - 1);
    };

    return (
        <Box className={classes.root}>
            <AppBar position="static">
                {props.readerView ?
                    <Toolbar className={classes.toolbar} variant="dense">
                        <Button onClick={handlePreviousPage} className={classes.menuButton}>Prev Page</Button>
                        <a href={document}><Button color="inherit" id="print-button">Download Invoice</Button></a>
                        <Button onClick={handleNextPage} className={classes.menuButton}>Next Page</Button>
                    </Toolbar> :
                    <Toolbar>
                        {props.hasSubmitted ?
                            <a href={document}><Button color="inherit" id="print-button">Download Invoice</Button></a> :
                            <Button onClick={() => {props.onClick()}} color="inherit">Generate Preview</Button>
                        }
                    </Toolbar>
                }

            </AppBar>
            {document ? <Document
                className={classes.document}
                onLoadError={console.error}
                onLoadSuccess={onDocumentLoad.bind(this)}
                file={document}
            >
                <Page pageNumber={pageNo} width="550"/>
            </Document> : null}
        </Box>
    );
};

export default GenerateDocument;
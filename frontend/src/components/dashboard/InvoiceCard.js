import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import GenerateDocument from "./GenerateDocument";

const useStyles = makeStyles(theme => ({
    patientDetails: {
        textAlign: 'left',
        fontSize: 16,
        padding: theme.spacing(2)
    },
    invoiceDate: {
        float: 'right'
    }
}));

const InvoiceCard = ({invoice}) => {
    const classes = useStyles();

    const generateSum = (sum, num) => {
        return (sum).toFixed(2) + (num).toFixed(2)
    };

    const generateTotal = (items) => {
        if(items === null) {
            let total = parseFloat(items.map(item => (item.qty * item.price).toFixed(2)).reduce(generateSum));
            console.log(total);
            return (total + (total * (invoice.taxPercent/100))).toFixed(2);
        }
        return "N/A"
    };
    return (
        <Container>
            {invoice.url ? <GenerateDocument document={invoice.url} readerView={true}/>:
                <Paper elevation={2}>
                    <p className={classes.patientDetails}>
                        <b>Invoice #</b>: {invoice.invoiceNum}
                        <br/>
                        <span className={classes.invoiceDate}><b>Date</b>: {new Date(invoice.date).toLocaleDateString("en-US")}</span>
                        <br/>
                        <b>Salesman</b>: {invoice.salesman}
                        <br/>
                        <b>Insurance Type</b>: {invoice.insuranceType}
                        <br/>
                        <b>Type</b>: {invoice.type}
                        <br/>
                        <br/>
                        <Divider variant={'middle'}/>
                        <br/>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Qty</TableCell>
                                    <TableCell align="right">Price&nbsp;($)</TableCell>
                                    <TableCell align="right">Amount&nbsp;($)</TableCell>
                                    <TableCell align="right">Part #</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoice.items.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.qty ? row.qty : "N/A"}</TableCell>
                                        <TableCell align="right">{row.price ? row.price.toFixed(2) : "N/A"}</TableCell>
                                        <TableCell align="right">{row.price && row.qty ? (row.price * row.qty).toFixed(2): "N/A"}</TableCell>
                                        <TableCell align="right">{row.part ? row.part: "N/A"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tax %</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{invoice.taxPercent ? invoice.taxPercent : "N/A"}%</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Grand Total</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{invoice.taxPercent && invoice.qty && invoice.price ? generateTotal(invoice.items) : "N/A"}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </p>
                </Paper>
            }
        </Container>
    );
};

export default InvoiceCard;
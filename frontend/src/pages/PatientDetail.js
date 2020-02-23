import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InvoiceList from '../components/dashboard/InvoiceList';
import PatientCard from "../components/dashboard/PatientCard";
import InvoiceCard from "../components/dashboard/InvoiceCard";
import DocumentList from "../components/dashboard/DocumentList";
import {FetchServiceModule} from '../App'
import GenerateDocument from "../components/dashboard/GenerateDocument";
import "../styles/PatientDetail.css"
import {BackButton} from "../components/Buttons";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const tabProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

class PatientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            patient: {},
            invoices: [],
            invoice: null,
            hasMoreInvoices: false,
            hasMoreDocuments: false,
            invoicePage: 1,
            documentPage: 1,
            isFetchingInvoices: false,
            isFetchingDocuments: false,
            document: null,
            documents: [],
            value: 0,
            editingPatient: false
        };
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        await this.getPatient(id);
        await this.getInvoices(id, this.state.invoicePage);
        await this.getDocuments(id, this.state.documentPage);
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };

    getPatient = async (id) => {
        this.setState({error: ''});
        try {
            let data = await FetchServiceModule.fetchPatient(id);
            if(data.status === 200) {
                let response = await data.json();
                this.setState({ patient: response })
            } else if(data.status === 400){
                let response = await data.json();
                this.setState({error: response.error})
            } else {
                this.setState({error: 'An error occurred on the server'})
            }
        } catch(err) {
            console.error(err)
            this.setState({error: 'An error occurred on the server'})
        }
    };

    getInvoices = async (patientId, pageNo) => {
        this.setState({error: ''});
        this.setState({isFetchingInvoices: true});
        try {
            let response = await FetchServiceModule.fetchInvoices(patientId, pageNo);
            if(response.status === 200) {
                let data = await response.json();
                let newInvoices = (this.state.invoicePage > 1) ? [...this.state.invoices].concat(data.rows) : data.rows;
                this.setState({ hasMoreInvoices: newInvoices.length < data.count });
                this.setState({ invoices: newInvoices })
            } else if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else {
                this.setState({error: 'An error has occurred on the server'})
            }
            this.setState({isFetchingInvoices: false})
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error has occurred'});
        }
    }

    getDocuments = async (patientId, pageNo) => {
        this.setState({error: ''});
        this.setState({isFetchingDocuments: true})
        try {
            let response = await FetchServiceModule.fetchDocuments(patientId, pageNo);
            if(response.status === 200) {
                let data = await response.json();
                let newDocs = (this.state.documentPage > 1) ? [...this.state.documents].concat(data.rows) : data.rows;
                this.setState({ hasMoreDocuments: newDocs.length < data.count });
                this.setState({ documents: newDocs })
            } else if(response.status === 400){
                let error = await response.json();
                this.setState({error: error.error})
            } else this.setState({error: 'An error occurred on the server'});
            this.setState({isFetchingDocuments: false})
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error has occurred'})
        }
    }

    getInvoice = async (id) => {
        this.setState({error: ''});
        try {
            let response = await FetchServiceModule.fetchInvoice(id);
            if(response.status === 200) {
                let data = await response.json();
                this.setState({ invoice: data })
            } else if(response.status === 400){
                let error = await response.json();
                this.setState({error: error.error})
            } else {
                this.setState({error: 'An error has occurred on the server'})
            }
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error has occurred'})
        }
    };

    getDocument = async (id) => {
        this.setState({error: ''});
        try {
            let response = await FetchServiceModule.fetchDocument(id);
            if(response.status === 200) {
                let data = await response.json();
                this.setState({ document: data })
            } else if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else {
                this.setState({error: 'An error has occurred on the server'});
            }
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error has occurred'});
        }
    };

    loadMoreInvoices = async () => {
        this.setState({invoicePage: this.state.invoicePage + 1});
        try {
            await this.getInvoices(this.state.patient.id, this.state.invoicePage)
        } catch(err) {
            console.log(err)
            this.setState({error: 'An error occurred while fetching invoices'});
        }
    };

    loadMoreDocuments = async () => {
        this.setState({documentPage: this.state.documentPage + 1});
        try {
            await this.getDocuments(this.state.patient.id, this.state.documentPage)
        } catch(err) {
            console.log(err)
        }
    };

    deselectInvoice = () => {
        this.setState({ invoice: null })
    };

    deselectDocument = () => {
        this.setState({document: null})
    };

    render () {
        return (
            <Grid container row>
                <Grid item md={5} sm={12} column>
                    <BackButton onClick={() => {this.props.history.replace('/dashboard')}} body="Home"/>
                    {this.state.error ? <div>
                        <span className="error-text">{this.state.error}</span>
                    </div>: null}
                    <Container className="patient-card">
                        <PatientCard patient={this.state.patient} getPatient={this.getPatient}/>
                    </Container>
                </Grid>
                <Grid item md={7} sm={12}>
                    <AppBar position="static">
                        <Tabs
                        onChange={this.handleChange}
                        value={this.state.value}
                        textColor="white"
                            aria-label="headers">
                            <Tab label="Invoices" {...tabProps(0)}/>
                            <Tab label="Documents" {...tabProps(1)}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.value} index={0}>
                        {this.state.invoice ?
                            <Box>
                                {this.state.invoice.url || this.state.invoice.items ? <AppBar position="static" variant="dense">
                                    <Toolbar>
                                        <Button color="inherit" onClick={this.deselectInvoice}><Icon>chevron_left</Icon>Back</Button>
                                    </Toolbar>
                                </AppBar> : null
                                }
                                <InvoiceCard invoice={this.state.invoice} />
                            </Box> :
                            <InvoiceList
                                onClick={this.getInvoice}
                                invoices={this.state.invoices}
                                hasMoreInvoices={this.state.hasMoreInvoices}
                                loadMoreInvoices={this.loadMoreInvoices}
                                isFetching={this.state.isFetchingInvoices}
                                patient={this.state.patient}
                                getInvoices={this.getInvoices}
                            />
                        }
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <Container>
                            {this.state.document ?
                                <Box>
                                    <AppBar position="static" variant="dense">
                                        <Toolbar>
                                            <Button color="inherit" onClick={this.deselectDocument}><Icon>chevron_left</Icon>Back</Button>
                                        </Toolbar>
                                    </AppBar>
                                    <GenerateDocument document={this.state.document.documentUrl} readerView={true}/>
                                </Box> :
                                <DocumentList
                                    getDocuments={this.getDocuments}
                                    onClick={this.getDocument}
                                    documents={this.state.documents}
                                    hasMoreDocuments={this.state.hasMoreDocuments}
                                    loadMore={this.loadMoreDocuments}
                                    isFetching={this.state.isFetchingDocuments}
                                    patient={this.state.patient}
                                />
                            }
                        </Container>
                    </TabPanel>
                </Grid>
            </Grid>
        );
    }
};

export default PatientDetail;
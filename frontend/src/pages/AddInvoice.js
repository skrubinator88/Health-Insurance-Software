import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../styles/addPatient.css';
import GenerateDocument from "../components/dashboard/GenerateDocument";
import ItemList from "../components/dashboard/ItemList";
import {OUT_FOR_DELIVERY, COMPLETE_AND_DELIVERED, PENDING_PATIENT_INFO, PENDING_ADDITIONAL_EQUIPMENT} from "../Globals";
import {FetchServiceModule, PostServiceModule} from "../App";
import {BackButton} from "../components/Buttons";

class AddInvoice extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            name: '',
            price: null,
            qty: null,
            part: null,
            salesTax: null,
            salesman: null,
            insuranceType: null,
            insuranceNo: null,
            address: null,
            customAddress: null,
            useCustom: false,
            items: [],
            patient: null,
            counter: 0,
            submitted: false,
            document: '',
            submissionMessage: false,
            status: ""
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        try {
            let response = await FetchServiceModule.fetchPatient(id);
            if(response.status === 200) {
                let data = await response.json()
                this.setState({ patient: data });
            } else if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else {
                this.setState({error: 'An error occurred on the server'})
            }
        } catch(err) {
            console.error(err)
            this.setState({error: 'An error has occurred'})
        }
    };

    handleSetName = (e) => {
        this.setState({name: e.target.value});
    };
    handleSetSalesman = (e) => {
        this.setState({salesman: e.target.value});
    };
    handleSetPrice = (e) => {
        this.setState({price: e.target.value});
    };
    handleSetQty = (e) => {
        this.setState({qty: e.target.value});
    };
    handleSetPart = (e) => {
        this.setState({part: e.target.value});
    };
    handleSetCustomAddress = (e) => {
        console.log(e.target.value);
        this.setState({customAddress: e.target.value.toUpperCase()});
    };
    handleSetAddress = (e) => {
        if (e.target.value === 'custom') {
            this.setState({address: null});
            this.setState({ useCustom: true });
        } else {
            this.setState({ useCustom: false, customAddress: null });
            this.setState({address: e.target.value});
        }
    };

    handleSetStatus = (e) => {
        this.setState({status: e.target.value});
    };

    handleSetSubmissionScreen = async () => {
        setTimeout(async () => {
            await this.generateInvoice(true);
        }, 1000);
        this.setState({ submissionMessage: true });
    };
    newItem = async () => {
        try {
            let items = [...this.state.items];
            items.push({
                price: this.state.price ? this.state.price : 0,
                name: this.state.name,
                part: this.state.part ? this.state.part : this.state.items.length + 1,
                qty: this.state.qty ? this.state.qty : 0
            });
            this.setState({items: items});
            this.setState({
                name: '',
                price: '',
                qty: '',
                part: ''
            });
        } catch(err) {
            console.log(err);
            this.setState({error: 'An error occurred while adding item'})
        }
    };

     generateInvoice = async (final) => {
         this.setState({error: ''});
         this.setState({ document: "" });
         try {
             console.log(this.state.items);
            let response = await PostServiceModule.generateInvoicePDF(this.state.patient.id, this.state.items, {
                salesman: this.state.salesman,
                address: this.state.address ? this.state.address : this.state.customAddress,
                status: this.state.status,
                isFinal: final ? final : false
            });
            if(response.status === 200) {
                let data = await response.json();
                this.setState({ document: data.Location, counter: this.state.counter + 1 })
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

     goBackToPatientDetail = () => {
         const { id } = this.props.match.params;
         this.props.history.replace(`/dashboard/patient/${id}`)
     }
     editInvoice = () => {
         this.setState({submissionMessage: false})
     };

     postInvoice = async () => {
         this.setState({error: ''});
         try {
             let response = await PostServiceModule.postInvoice(this.state.patient.id, this.state.items, {
                 salesman: this.state.salesman,
                 address: this.state.address ? this.state.address : this.state.customAddress,
                 status: this.state.status
             }, this.state.document);

             if(response.status === 200) {
                 let data = await response.json();
                 this.setState({ submitted: true });
                 this.setState({ document: data.url, counter: this.state.counter + 1 })
             } else if(response.status === 400){
                 let error = await response.json();
                 this.setState({error: error.error})
             } else {
                 this.setState({error: 'An error has occurred on the server'})
             }
         } catch(err) {
             console.error(err)
             this.setState({error: 'An error has occurred'})
         }
     };

     removeItem = async (index) => {
        let newItems = [...this.state.items];
        newItems.splice(index, 1);
        this.setState({ items: newItems });
     };

    render() {
        return (
            <Box>
                {this.state.submitted ?
                    <GenerateDocument counter={this.state.counter} document={this.state.document} onClick={this.generateInvoice} hasSubmitted={true}/>
                    :
                    <Grid container direction="row">
                        <Grid item sm={6} xs={12}>
                            {this.state.patient ?
                                <BackButton body={this.state.patient.name} onClick={this.goBackToPatientDetail}/>
                                : null
                            }
                            <Container maxWidth={'md'}>
                                {this.state.error ? <div>
                                    <span className="error-text">{this.state.error}</span>
                                </div>: null}
                                {this.state.submissionMessage ?
                                    <Paper className='mainElement confirmationElement'>
                                        <h1 className="confirmationMessage">Please review the sample invoice and go back to make changes, or confirm submission.</h1>
                                        <br/>
                                        <Paper
                                        className="confirmationButton" onClick={this.editInvoice}>
                                            <p className="fabButtonEdit">
                                                <Icon>redo</Icon> Edit Invoice
                                            </p>
                                        </Paper>
                                        &nbsp;&nbsp;
                                        <Paper
                                            className="confirmationButton" onClick={this.postInvoice}>
                                            <p className="fabButtonConfirm">
                                                <Icon>done</Icon> Confirm
                                            </p>
                                        </Paper>
                                    </Paper> :
                                    <Paper className='mainElement'>
                                        <Toolbar elevation={1} >
                                            <h1 className='title'>Create Invoice</h1>
                                        </Toolbar>
                                        <Divider variant="middle"/>
                                        <form className='form-container' noValidate>
                                            <TextField
                                                id="qty"
                                                label="Sales Tax"
                                                margin="normal"
                                                disabled
                                                value={0.06}
                                                className='addressField'
                                            />
                                            {this.state.patient ? <div><TextField
                                                id="part"
                                                label="Insurance Type"
                                                margin="normal"
                                                disabled
                                                value={this.state.patient.insuranceType}
                                                className='codeField'
                                            />
                                                <TextField
                                                    id="part"
                                                    label="Insurance No."
                                                    margin="normal"
                                                    disabled
                                                    value={this.state.patient.insuranceNo}
                                                    className='codeField'
                                                /></div>: null}
                                            <TextField
                                                id="part"
                                                label="Salesman"
                                                margin="normal"
                                                onChange={this.handleSetSalesman}
                                                value={this.state.salesman}
                                                className='codeField'
                                            />
                                            {this.state.patient ?
                                                <FormControl >
                                                    <InputLabel htmlFor="address">Choose Shipping Address</InputLabel>
                                                    <Select
                                                        className='formControl'
                                                        native
                                                        onChange={this.handleSetAddress}
                                                        value={this.state.address}
                                                        inputProps={{
                                                            name: 'patient-address',
                                                            id: 'address',
                                                        }}
                                                    >
                                                        <option value="" />
                                                        <option value="custom">Enter Custom Address</option>
                                                        {this.state.patient.street1 ?
                                                            <option value={this.state.patient.street1}>{this.state.patient.street1}</option> : null
                                                        }
                                                        {this.state.patient.street2 ?
                                                            <option value={this.state.patient.street2}>{this.state.patient.street2}</option> : null
                                                        }
                                                    </Select>
                                                </FormControl> : null
                                            }
                                            {this.state.useCustom ?
                                                <TextField
                                                    id="address"
                                                    label="Custom Shipping Address"
                                                    margin="normal"
                                                    onChange={this.handleSetCustomAddress}
                                                    value={this.state.customAddress}
                                                    className='codeField'
                                                /> : null
                                            }
                                            <FormControl >
                                                <InputLabel htmlFor="status">Set Invoice Status</InputLabel>
                                                <Select
                                                    className='formControl'
                                                    native
                                                    onChange={this.handleSetStatus}
                                                    value={this.state.status}
                                                    inputProps={{
                                                        name: 'invoice-status',
                                                        id: 'status',
                                                    }}
                                                >
                                                    <option value="" />
                                                    <option value={OUT_FOR_DELIVERY}>{OUT_FOR_DELIVERY}</option>
                                                    <option value={COMPLETE_AND_DELIVERED}>{COMPLETE_AND_DELIVERED}</option>
                                                    <option value={PENDING_PATIENT_INFO}>{PENDING_PATIENT_INFO}</option>
                                                    <option value={PENDING_ADDITIONAL_EQUIPMENT}>{PENDING_ADDITIONAL_EQUIPMENT}</option>

                                                </Select>
                                            </FormControl>
                                        </form>

                                        <Divider variant="middle"/>
                                        <br/>
                                        <span className="invoiceItemTitle">New Invoice Item</span>
                                        <form className='form-container' noValidate>
                                            <TextField
                                                id="name"
                                                label="Description"
                                                margin="normal"
                                                onChange={this.handleSetName}
                                                value={this.state.name}
                                                className='nameField'
                                            />
                                            <TextField
                                                id="price"
                                                label="Price($)"
                                                margin="normal"
                                                type="number"
                                                onChange={this.handleSetPrice}
                                                value={this.state.price}
                                                className='addressField'
                                            />
                                            <TextField
                                                id="qty"
                                                label="Qty"
                                                margin="normal"
                                                type="number"
                                                onChange={this.handleSetQty}
                                                value={this.state.qty}
                                                className='addressField'
                                            />
                                            <TextField
                                                id="part"
                                                label="Part No"
                                                margin="normal"
                                                type="number"
                                                onChange={this.handleSetPart}
                                                value={this.state.part}
                                                className='addressField'
                                            />
                                        </form>
                                        <Button onClick={this.newItem}>Add Item</Button>
                                        <Divider variant="middle"/>
                                        <br/>
                                        <ItemList onRemoveClick={this.removeItem}
                                                  items={this.state.items}
                                                  handleDescription={this.handleSetName}
                                                  handlePart={this.handleSetPart}
                                                  handleQty={this.handleSetQty}
                                                  handlePrice={this.handleSetPrice}
                                        />
                                        <Button onClick={this.handleSetSubmissionScreen}>Submit Invoice</Button>
                                    </Paper>
                                }
                            </Container>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <GenerateDocument counter={this.state.counter} document={this.state.document} onClick={this.generateInvoice} hasSubmitted={false}/>
                        </Grid>
                    </Grid>
                }
            </Box>
        );
    }
}

export default AddInvoice;
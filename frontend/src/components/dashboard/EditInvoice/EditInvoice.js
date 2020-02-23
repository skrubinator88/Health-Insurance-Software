import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from "@material-ui/core/CircularProgress";
import listActions from '../../listActions'
import '../../../styles/editInvoice.css';
import ItemList from "../../../components/dashboard/ItemList";
import {OUT_FOR_DELIVERY, COMPLETE_AND_DELIVERED, PENDING_PATIENT_INFO, PENDING_ADDITIONAL_EQUIPMENT} from "../../../Globals";
import {FetchServiceModule, UpdateServiceModule} from "../../../App";

class EditInvoice extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            name: '',
            price: null,
            qty: null,
            part: null,
            salesman: null,
            address: null,
            customAddress: null,
            useCustom: false,
            items: [],
            invoice: null,
            patient: null,
            counter: 0,
            submitted: false,
            document: '',
            submissionMessage: false,
            status: "",
            isLoading: false
        }
    }

    componentDidMount = async () => {
        const id = this.props.invoiceId;
        this.setState({patient: this.props.patient});
        try {
            let response = await FetchServiceModule.fetchInvoice(id);
            if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else if(response.status === 200) {
                let data = await response.json();
                this.setState({
                    invoice: data,
                    status: data.status,
                    items: data.items,
                    address: data.invoiceStreet1,
                    salesman: data.salesman
                });
            } else {
                this.setState({error: 'An error occurred on the server'})
            }
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error occurred on the server'})
        }
    };
    editItem = (index, attribute, value) => {
        this.setState({items: listActions.editItem(index, ...this.state.items, attribute, value)})
    };
    handleSetName = (e) => {
        this.setState({name: e.target.value});
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
    handleEditName = (e, index) => {
        this.editItem(index, 'name', e.target.value)
    }
    handleEditPrice = (e, index) => {
        this.editItem(index, 'price', e.target.value)
    }
    handleEditQty = (e, index) => {
        this.editItem(index, 'qty', e.target.value)
    }
    handleEditPart = (e, index) => {
        this.editItem(index, 'part', e.target.value)
    };
    handleSetSalesman = (e) => {
        this.setState({salesman: e.target.value});
    };
    handleSetCustomAddress = (e) => {
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
            console.error(err);
        }
    };

    updateInvoice = async () => {
        this.setState({isLoading: true});
        try {
            console.log(this.state.items);
            let response = await UpdateServiceModule.updateInvoice(this.state.invoice.id, this.state.items, {
                salesman: this.state.salesman,
                address: this.state.address ? this.state.address : this.state.customAddress,
                status: this.state.status,
                isFinal: true
            });
            if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else if(response.status === 200) {
                this.setState({isLoading: false});
                this.setState({ submitted: true });
            } else {
                this.setState({error: 'An error occurred on the server'})
            }
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error occurred on the server'})
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
                {this.state.error ? <div>
                    <span className="error-text">{this.state.error}</span>
                </div>: null}
                {this.state.submitted ?
                        <div>
                            <h1 className="submissionMessage">Changes are successfully saved</h1>
                            <Button onClick={this.props.close}>Close</Button> &nbsp;
                        </div>
                    :
                    <Container >
                        <Paper className='mainElement'>
                            <Toolbar elevation={1} >
                                <h1 className='title'>Update Invoice</h1>
                            </Toolbar>
                            <Divider variant="middle"/>
                            <form className='container' noValidate>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="update-salesman"
                                    label="Salesman"
                                    margin="normal"
                                    onChange={this.handleSetSalesman}
                                    value={this.state.salesman}
                                    className='codeField'
                                />
                                {this.state.patient ?
                                    <FormControl>
                                        <InputLabel htmlFor="update-address"
                                                    shrink
                                        >Choose Shipping Address</InputLabel>
                                        <Select
                                            className='formControl'
                                            native
                                            onChange={this.handleSetAddress}
                                            value={this.state.address}
                                            inputProps={{
                                                name: 'patient-address',
                                                id: 'update-address',
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
                                        InputLabelProps={{ shrink: true }}
                                        id="shipping-address"
                                        label="Custom Shipping Address"
                                        margin="normal"
                                        onChange={this.handleSetCustomAddress}
                                        value={this.state.customAddress}
                                        className='codeField'
                                    /> : null
                                }
                                <FormControl >
                                    <InputLabel htmlFor="update-status">Set Invoice Status</InputLabel>
                                    <Select
                                        className='formControl'
                                        native
                                        onChange={this.handleSetStatus}
                                        value={this.state.status}
                                        inputProps={{
                                            name: 'invoice-status',
                                            id: 'update-status',
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
                            <form className='container' noValidate>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="update-name"
                                    label="Description"
                                    margin="normal"
                                    onChange={this.handleSetName}
                                    value={this.state.name}
                                    className='nameField'
                                />
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="update-price"
                                    label="Price($)"
                                    margin="normal"
                                    type="number"
                                    onChange={this.handleSetPrice}
                                    value={this.state.price}
                                    className='addressField'
                                />
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="update-qty"
                                    label="Qty"
                                    margin="normal"
                                    type="number"
                                    onChange={this.handleSetQty}
                                    value={this.state.qty}
                                    className='addressField'
                                />
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    id="update-part"
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
                                      handleDescription={this.handleEditName}
                                      handlePart={this.handleEditPart}
                                      handleQty={this.handleEditQty}
                                      handlePrice={this.handleEditPrice}
                            />
                            <div>
                                <Button onClick={this.props.close}>Cancel</Button> &nbsp;
                                <Button onClick={this.updateInvoice}>Save Changes</Button> &nbsp;
                                {this.state.isLoading ? <CircularProgress size={15} color="primary"/> : null}
                            </div>
                        </Paper>
                    </Container>
                }
            </Box>
        );
    }
}

export default EditInvoice;
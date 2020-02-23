import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import '../../../styles/UpdatePatient.css';
import {FetchServiceModule, UpdateServiceModule} from "../../../App";
const env = process.env.NODE_ENV || 'production';
const config = require('../../../config')[env];
let api = config.api;

class UpdatePatient extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: '',
            street: '',
            street2: '',
            sex: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
            height: '',
            weight: '',
            insuranceType: '',
            insuranceNo: '',
            birthdate: '',
            doctor: '',
            counter: 0,
            submitted: false
        }
    }

    componentDidMount = async () => {
        const id = this.props.patientId;
        try {
            let response = await FetchServiceModule.fetchPatient(id);
            if(response.status === 200) {
                let data = await response.json();
                this.setState({
                    name: data.name,
                    street: data.street1,
                    street2: data.street2,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    phone: data.phone,
                    height: data.height,
                    weight: data.weight,
                    insuranceType: data.insuranceType,
                    insuranceNo: data.insuranceNo,
                    birthdate: data.birthdate,
                    sex: data.sex,
                    doctor: data.doctor
                });
            } else if(response.status === 400) {
                let data = await response.json();
                this.setState({error: data.error})
            } else this.setState({error: 'An error occurred on the server'})
        } catch(err) {
            console.error(err)
        }
    };

    date = new Date();
    handleSetName = (e) => {
        this.setState({name: e.target.value});
    };
    handleSetStreet = (e) => {
        this.setState({street: e.target.value});
    };
    handleSetStreet2 = (e) => {
        this.setState({street2: e.target.value});
    };
    handleSetCity = (e) => {
        this.setState({city: e.target.value});
    };
    handleSetSex = (e) => {
        this.setState({sex: e.target.value});
    };
    handleSetState = (e) => {
        this.setState({state: e.target.value});
    };
    handleSetBirthdate = (e) => {
        this.setState({birthdate: e.target.value});
    };
    handleSetZipCode = (e) => {
        this.setState({zipCode: e.target.value});
    };
    handleSetPhone = (e) => {
        this.setState({phone: e.target.value});
    };
    handleSetWeight = (e) => {
        this.setState({weight: e.target.value});
    };
    handleSetHeight = (e) => {
        this.setState({height: e.target.value});
    };
    handleSetInsuranceNo = (e) => {
        this.setState({insuranceNo: e.target.value});
    };
    handleSetInsuranceType = (e) => {
        this.setState({insuranceType: e.target.value});
    };
    handleSetDoctor = (e) => {
        this.setState({doctor: e.target.value});
    };

     updatePatient = async () => {
         this.setState({isLoading: true});
         try {
             let response = await UpdateServiceModule.updatePatient(this.props.patientId, {
                 name: this.state.name,
                 street1: this.state.street,
                 street2: this.state.street2,
                 city: this.state.city,
                 state: this.state.state,
                 zipCode: this.state.zipCode,
                 telephone1: this.state.phone,
                 height: this.state.height,
                 weight: this.state.weight,
                 insuranceType: this.state.insuranceType,
                 insuranceNo: this.state.insuranceNo,
                 birthdate: this.state.birthdate,
                 doctor: this.state.doctor,
                 sex: this.state.sex
             });

             if(response.status === 400) {
                 let error = await response.json();
                 this.setState({isLoading: false, error: error.error});
             } else if(response.status === 200){
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

    render() {
        return (
            <Box>
                {this.state.error ?
                    <div>
                        <span className="error-text">{this.state.error}</span>
                    </div>: null}

                {this.state.submitted ?
                    <div>
                        <h1 className="submissionMessage">Changes are successfully saved</h1>
                        <Button onClick={this.props.close}>Close</Button> &nbsp;
                    </div> :
                    <Grid container direction="row">
                        <Grid item xs={12}>
                            <Container maxWidth={'md'}>
                                <Paper className='mainElement'>
                                    <Toolbar elevation={1} >
                                        <h1 className='title'>Update Patient</h1>
                                    </Toolbar>
                                    <Divider variant="middle"/>
                                    <form className='form-container' noValidate>
                                        <TextField
                                            label="Patient Name"
                                            margin="normal"
                                            onChange={this.handleSetName}
                                            value={this.state.name}
                                            className='nameField'
                                        />
                                        <TextField
                                            label="Street"
                                            margin="normal"
                                            onChange={this.handleSetStreet}
                                            value={this.state.street}
                                            className='streetField'
                                        />
                                        <TextField
                                            label="Street 2"
                                            onChange={this.handleSetStreet2}
                                            value={this.state.street2}
                                            margin="normal"
                                            className='streetField'
                                        />

                                        <TextField
                                            label="City"
                                            margin="normal"
                                            onChange={this.handleSetCity}
                                            value={this.state.city}
                                            className='cityField'
                                        />
                                        <TextField
                                            label="State"
                                            margin="normal"
                                            onChange={this.handleSetState}
                                            value={this.state.state}
                                            className='addressField'
                                        />
                                        <TextField
                                            label="ZipCode"
                                            margin="normal"
                                            onChange={this.handleSetZipCode}
                                            value={this.state.zipCode}
                                            className='addressField'
                                        />
                                        <TextField
                                            label="Phone"
                                            margin="normal"
                                            onChange={this.handleSetPhone}
                                            value={this.state.phone}
                                            className='codeField'
                                        />
                                        <TextField
                                            label="Sex"
                                            margin="normal"
                                            onChange={this.handleSetSex}
                                            value={this.state.sex}
                                            className='addressField'
                                        />
                                        <TextField
                                            label="Date of Birth"
                                            margin="normal"
                                            className='codeField'
                                            type='date'
                                            onChange={this.handleSetBirthdate}
                                            value={this.state.birthdate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            label="Height"
                                            onChange={this.handleSetHeight}
                                            value={this.state.height}
                                            margin="normal"
                                            className='addressField'
                                        />
                                        <TextField
                                            label="Weight"
                                            onChange={this.handleSetWeight}
                                            value={this.state.weight}
                                            margin="normal"
                                            className='addressField'
                                        />
                                        <TextField
                                            label="Insurance Type"
                                            onChange={this.handleSetInsuranceType}
                                            value={this.state.insuranceType}
                                            margin="normal"
                                            className='codeField'
                                        />
                                        <TextField
                                            label="Insurance No."
                                            onChange={this.handleSetInsuranceNo}
                                            value={this.state.insuranceNo}
                                            margin="normal"
                                            className='codeField'
                                        />
                                        <TextField
                                            label="Doctor Name"
                                            onChange={this.handleSetDoctor}
                                            value={this.state.doctor}
                                            margin="normal"
                                            className='codeField'
                                        />
                                    </form>
                                    <Button onClick={this.props.close}>Cancel</Button> &nbsp;
                                    <Button onClick={this.updatePatient}>Save Changes</Button>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                }
            </Box>
        );
    }
}

export default UpdatePatient;
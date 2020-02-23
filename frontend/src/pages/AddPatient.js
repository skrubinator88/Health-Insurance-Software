import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import '../styles/addPatient.css';
import {PostServiceModule} from "../App";
import {BackButton} from "../components/Buttons";

const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];

let api = config.api;

class AddPatient extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            name: '',
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

     newPatient = async () => {
         try {
             this.setState({error: ''});
             this.setState({ document: "" });
             let response = await PostServiceModule.postPatient({
                 name: this.state.name,
                 street: this.state.street,
                 street2: this.state.street2,
                 city: this.state.city,
                 state: this.state.state,
                 zipCode: this.state.zipCode,
                 phone: this.state.phone,
                 height: this.state.height,
                 weight: this.state.weight,
                 insuranceType: this.state.insuranceType,
                 insuranceNo: this.state.insuranceNo,
                 birthdate: this.state.birthdate,
                 doctor: this.state.doctor
             });

             if(response.status === 200) {
                 let data = await response.json();
                 this.props.history.push(`/dashboard/patient/${data.id}`)
             } else if(response.status === 400) {
                 let error = await response.json();
                 this.setState({error: error.error});
             } else {
                 this.setState({error: 'An error has occurred on the server'})
             }
         } catch(err) {
             console.error(err);
             this.setState({error: 'An error has occurred'})
         }
    };

    render() {
        return (
            <Box>
                <BackButton onClick={() => {this.props.history.replace('/dashboard')}} body={'Home'}/>
                {this.state.error ?
                    <div>
                        <span className="error-text">{this.state.error}</span>
                    </div>
                    : null}
                {this.state.submitted ? <h1></h1> :
                    <Grid container direction="row">
                        <Grid item xs={12}>
                            <Container maxWidth={'md'}>
                                <Paper className='mainElement'>
                                    <Toolbar elevation={1} >
                                        <h1 className='title'>New Patient Form</h1>
                                    </Toolbar>
                                    <Divider variant="middle"/>
                                    <form className='form-container' noValidate>
                                        <TextField
                                            id="patient-name"
                                            label="Patient Name"
                                            margin="normal"
                                            onChange={this.handleSetName}
                                            value={this.state.name}
                                            className='nameField'
                                        />
                                        <TextField
                                            id="patient-address"
                                            label="Street"
                                            margin="normal"
                                            onChange={this.handleSetStreet}
                                            value={this.state.street}
                                            className='streetField'
                                        />
                                        <TextField
                                            id="patient-address2"
                                            label="Street 2"
                                            onChange={this.handleSetStreet2}
                                            value={this.state.street2}
                                            margin="normal"
                                            className='streetField'
                                        />

                                        <TextField
                                            id="patient-city"
                                            label="City"
                                            margin="normal"
                                            onChange={this.handleSetCity}
                                            value={this.state.city}
                                            className='cityField'
                                        />
                                        <TextField
                                            id="patient-state"
                                            label="State"
                                            margin="normal"
                                            onChange={this.handleSetState}
                                            value={this.state.state}
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-zipcode"
                                            label="ZipCode"
                                            margin="normal"
                                            onChange={this.handleSetZipCode}
                                            value={this.state.zipCode}
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-phone"
                                            label="Phone"
                                            margin="normal"
                                            onChange={this.handleSetPhone}
                                            value={this.state.phone}
                                            className='codeField'
                                        />
                                        <TextField
                                            id="patient-date-entered"
                                            label="Date Entered"
                                            margin="normal"
                                            disabled
                                            value={this.date.toLocaleDateString("en-US")}
                                            className='codeField'
                                        />
                                        <TextField
                                            id="patient-sex"
                                            label="Sex"
                                            margin="normal"
                                            onChange={this.handleSetSex}
                                            value={this.state.sex}
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-birth-date"
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
                                            id="patient-height"
                                            label="Height"
                                            onChange={this.handleSetHeight}
                                            value={this.state.height}
                                            margin="normal"
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-weight"
                                            label="Weight"
                                            onChange={this.handleSetWeight}
                                            value={this.state.weight}
                                            margin="normal"
                                            className='addressField'
                                        />
                                        <TextField
                                            id="insurance-name"
                                            label="Insurance Type"
                                            onChange={this.handleSetInsuranceType}
                                            value={this.state.insuranceType}
                                            margin="normal"
                                            className='codeField'
                                        />
                                        <TextField
                                            id="insurance-no"
                                            label="Insurance No."
                                            onChange={this.handleSetInsuranceNo}
                                            value={this.state.insuranceNo}
                                            margin="normal"
                                            className='codeField'
                                        />
                                        <TextField
                                            id="patient-doctor-name"
                                            label="Doctor Name"
                                            onChange={this.handleSetDoctor}
                                            value={this.state.doctor}
                                            margin="normal"
                                            className='codeField'
                                        />
                                    </form>
                                    <Button onClick={this.newPatient}>Submit</Button>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                }
            </Box>
        );
    }
}

export default AddPatient;
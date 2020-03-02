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
import PropTypes from "prop-types";
import {connect} from "react-redux";

const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];

class AddHealthPlan extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            name: '',
            type: '',
            deductible: "",
            description: '',
            premium: "",
            counter: 0,
            submitted: false
        }
    }
    date = new Date();
    handleSetName = (e) => {
        this.setState({name: e.target.value});
    };
    handleSetType = (e) => {
        this.setState({type: e.target.value});
    };
    handleSetDeductible = (e) => {
        this.setState({deductible: e.target.value});
    };
    handleSetDescription = (e) => {
        this.setState({description: e.target.value});
    };
    handleSetPremium = (e) => {
        this.setState({premium: e.target.value});
    };

     newHealthPlan = async () => {
         try {
             this.setState({error: ''});
             this.setState({ document: "" });
             let response = await PostServiceModule.postHealthPlan({
                 name: this.state.name,
                 type: this.state.type,
                 deductible: this.state.deductible,
                 description: this.state.description,
                 premium: this.state.premium,
             });

             if(response.status === 200) {
                 let data = await response.json();
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
                                        <h1 className='title'>New Health Plan Form</h1>
                                    </Toolbar>
                                    <Divider variant="middle"/>
                                    <form className='form-container' noValidate>
                                        <TextField
                                            id="patient-name"
                                            label="Name"
                                            margin="normal"
                                            onChange={this.handleSetName}
                                            value={this.state.name}
                                            className='nameField'
                                        />
                                        <TextField
                                            id="patient-address"
                                            label="Type"
                                            margin="normal"
                                            onChange={this.handleSetType}
                                            value={this.state.type}
                                            className='nameField'
                                        />
                                        <TextField
                                            id="patient-address2"
                                            label="Deductible"
                                            onChange={this.handleSetDeductible}
                                            value={this.state.deductible}
                                            margin="normal"
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-state"
                                            label="Premium"
                                            margin="normal"
                                            onChange={this.handleSetPremium}
                                            value={this.state.premium}
                                            className='addressField'
                                        />
                                        <TextField
                                            id="patient-city"
                                            label="Description"
                                            margin="normal"
                                            className="streetField"
                                            onChange={this.handleSetDescription}
                                            value={this.state.description}
                                            multiline
                                            rowsMax="6"
                                        />
                                    </form>
                                    <Button onClick={this.newHealthPlan}>Submit</Button>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                }
            </Box>
        );
    }
}

export default AddHealthPlan;
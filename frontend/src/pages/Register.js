import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import '../styles/Login.css'
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {LoginButton, RegisterButton} from '../components/Buttons'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {register} from '../actions/authActions'
import { clearErrors } from "../actions/errorActions";
import Switch from '@material-ui/core/Switch';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            password: '',
            telephone: '',
            specialty: '',
            street: '',
            city: '',
            zipcode: '',
            state: '',
            error: '',
            isProvider: false
        };
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error ) {
            if(error.status) this.setState({error: error.message})
            else this.setState({error: ''})
        }
    };

    handleSetPassword = (e) => {
        e.preventDefault();
        this.setState({password: e.target.value})
    }

    handleSetUsername = (e) => {
        e.preventDefault();
        this.setState({username: e.target.value})
    }

    handleSetName = (e) => {
        e.preventDefault();
        this.setState({name: e.target.value})
    }

    handleSetProvider = (e) => {
        e.preventDefault();
        this.setState({isProvider: e.target.checked})
    }

    handleSetTelephone = (e) => {
        e.preventDefault();
        this.setState({telephone: e.target.value})
    }

    handleSetSpecialty = (e) => {
        e.preventDefault();
        this.setState({specialty: e.target.value})
    }

    handleSetStreet = (e) => {
        e.preventDefault();
        this.setState({street: e.target.value})
    }

    handleSetCity = (e) => {
        e.preventDefault();
        this.setState({city: e.target.value})
    }

    handleSetZipCode = (e) => {
        e.preventDefault();
        this.setState({zipcode: e.target.value})
    }

    handleSetState = (e) => {
        e.preventDefault();
        this.setState({state: e.target.value})
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.props.register({
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            telephone: this.state.telephone,
            specialty: this.state.specialty,
            street: this.state.street,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state: this.state.state
        }, this.state.isProvider);
        if(this.props.isAuthenticated) this.props.history.push('/dashboard/addHealthPlan')
    };
    render () {
        return (
            <Container maxWidth='md' className="container">
                <span className="title-text">Register</span>
                <br/>
                <Paper className="login-container">
                    {this.state.error ? <div>
                        <span className="error-text">{this.state.error}</span>
                        <br/>
                    </div>: null}

                    <form noValidate>
                        <TextField
                            label="Username"
                            margin="normal"
                            onChange={this.handleSetUsername}
                            value={this.state.username}
                            autoComplete="new-password"
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="Password"
                            margin="normal"
                            autoComplete="new-password"
                            onChange={this.handleSetPassword}
                            value={this.state.password}
                            type="password"
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="Provider Name"
                            margin="normal"
                            onChange={this.handleSetName}
                            value={this.state.name}
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="Telephone"
                            margin="normal"
                            onChange={this.handleSetTelephone}
                            value={this.state.telephone}
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="Specialty"
                            margin="normal"
                            onChange={this.handleSetSpecialty}
                            value={this.state.specialty}
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="Street"
                            margin="normal"
                            onChange={this.handleSetStreet}
                            value={this.state.street}
                            variant="outlined"
                            className='input'
                        />
                        &nbsp;&nbsp;
                        <TextField
                            label="City"
                            margin="normal"
                            onChange={this.handleSetCity}
                            value={this.state.city}
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <TextField
                            label="ZipCode"
                            margin="normal"
                            onChange={this.handleSetZipCode}
                            value={this.state.zipCode}
                            variant="outlined"
                            className='input'
                        />
                        &nbsp;&nbsp;
                        <TextField
                            label="State"
                            margin="normal"
                            onChange={this.handleSetState}
                            value={this.state.state}
                            variant="outlined"
                            className='input'
                        />
                        <br/>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.isProvider}
                                    onChange={this.handleSetProvider}
                                    value={this.state.isProvider} />
                            }
                            label="Provider"
                        />
                        <RegisterButton className="login-button" onClick={this.onSubmit}/>
                    </form>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(
    mapStateToProps,
    { register, clearErrors }
)(Register);
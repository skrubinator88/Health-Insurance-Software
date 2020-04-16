import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import '../styles/Login.css'
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {LoginButton} from '../components/Buttons'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from '../actions/authActions'
import { clearErrors } from "../actions/errorActions";
import Switch from '@material-ui/core/Switch';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            isProvider: false
        };
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
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
    handleSetProvider = (e) => {
        e.preventDefault();
        this.setState({isProvider: e.target.value})
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.props.login({
            username: this.state.username,
            password: this.state.password
        }, this.state.isProvider);
        if(this.props.isAuthenticated) this.props.history.push('/dashboard')
    };
    render () {
        return (
            <Container maxWidth='md' className="container">
                <span className="title-text">Login</span>
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.isProvider}
                                    onChange={this.handleSetProvider}
                                    value={this.state.isProvider} />
                            }
                            label="Provider"
                        />
                        <LoginButton className="login-button" onClick={this.onSubmit}/>
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
    { login, clearErrors }
)(Login);

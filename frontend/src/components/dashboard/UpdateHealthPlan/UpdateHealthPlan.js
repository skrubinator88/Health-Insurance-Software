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

class UpdateHealthPlan extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            name: '',
            type: '',
            deductible: '',
            description: '',
            premium: '',
            counter: 0,
            submitted: false
        }
    }

    componentDidMount = async () => {
        const id = this.props.healthPlanId;
        try {
            let response = await FetchServiceModule.fetchHealthPlan(id);
            if(response.status === 200) {
                let data = await response.json();
                this.setState({
                    name: data.name,
                    type: data.type,
                    deductible: data.deductible,
                    description: data.description,
                    premium: data.premium,
                });
            } else if(response.status === 400) {
                let data = await response.json();
                this.setState({error: data.error})
            } else this.setState({error: 'An error occurred on the server'})
        } catch(err) {
            console.error(err)
        }
    };

    handleSetName = (e) => {
        this.setState({name: e.target.value});
    };
    handleSetType = (e) => {
        this.setState({type: e.target.value});
    };
    handleSetDeductible = (e) => {
        this.setState({deductible: e.target.value});
    };
    handleSetPremium = (e) => {
        this.setState({premium: e.target.value});
    };

     updateHealthPlan = async () => {
         this.setState({isLoading: true});
         try {
             let response = await UpdateServiceModule.updateHealthPlan(this.props.healthPlanId, {
                 name: this.state.name,
                 type: this.state.type,
                 deductible: this.state.deductible,
                 description: this.state.description,
                 premium: this.state.premium,
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
             this.setState({error: 'An error occurred has occurred'})
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
                                        <h1 className='title'>Update Health Plan</h1>
                                    </Toolbar>
                                    <Divider variant="middle"/>
                                    <form className='form-container' noValidate>
                                        <TextField
                                            label="Name"
                                            margin="normal"
                                            onChange={this.handleSetName}
                                            value={this.state.name}
                                            className='nameField'
                                        />
                                        <TextField
                                            label="Type"
                                            margin="normal"
                                            onChange={this.handleSetType}
                                            value={this.state.type}
                                            className='streetField'
                                        />
                                        <TextField
                                            label="Deductible"
                                            onChange={this.handleSetDeductible}
                                            value={this.state.deductible}
                                            margin="normal"
                                            className='streetField'
                                        />

                                        <TextField
                                            label="Premium"
                                            margin="normal"
                                            onChange={this.handleSetPremium}
                                            value={this.state.premium}
                                            className='cityField'
                                        />
                                    </form>
                                    <Button onClick={this.props.close}>Cancel</Button> &nbsp;
                                    <Button onClick={this.updateHealthPlan}>Save Changes</Button>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                }
            </Box>
        );
    }
}

export default UpdateHealthPlan;

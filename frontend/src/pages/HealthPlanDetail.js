import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HealthPlanCard from "../components/dashboard/HealthPlanCard";
import {FetchServiceModule} from '../App'
import "../styles/PatientDetail.css"
import {BackButton} from "../components/Buttons";

class HealthPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            healthPlan: {},
            value: 0,
            editingPatient: false
        };
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        await this.getHealthPlan(id);
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };

    getHealthPlan = async (id) => {
        this.setState({error: ''});
        try {
            let data = await FetchServiceModule.fetchHealthPlan(id);
            if(data.status === 200) {
                let response = await data.json();
                this.setState({ healthPlan: response })
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

    render () {
        return (
            <Grid container row>
                <Grid item md={5} sm={12} column>
                    <BackButton onClick={() => {this.props.history.replace('/dashboard')}} body="Home"/>
                    {this.state.error ? <div>
                        <span className="error-text">{this.state.error}</span>
                    </div>: null}
                    <Container className="patient-card">
                        <HealthPlanCard healthPlan={this.state.healthPlan} getHealthPlan={this.getHealthPlan}/>
                    </Container>
                </Grid>
            </Grid>
        );
    }
};

export default HealthPlanDetail;

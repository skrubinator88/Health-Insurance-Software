import React, { Component } from 'react';
import HealthPlanListBox from '../components/dashboard/HealthPlanListBox'
import SearchBar from "../components/SearchBar";
import Container from '@material-ui/core/Container';
import debounce from 'lodash.debounce';
import {FetchServiceModule} from "../App";
const env = process.env.NODE_ENV || 'production';
const config = require('../config')[env];

let api = config.api;

class DashboardHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            healthPlans: [],
            search: '',
            page: 1,
            hasMore: false,
            isFetching: false
        };
    }

    componentDidMount = async () => {
        try {
            await this.getHealthPlans()
        } catch(err) {
            console.log(err)
        }
    };

    searchHealthPlans = debounce(async (search) => {
        try {
            this.setState({ search: search });
            this.setState({ healthPlans: [] });
            this.setState({ page: 1 });
            await this.getHealthPlans()
        } catch(err) {
            console.log(err)
        }
    }, 400);

    getHealthPlans = async (pageNo) => {
        try {
            this.setState({error: ''});
            this.setState({isFetching: true});
            let response = await FetchServiceModule.fetchHealthPlans(pageNo, this.state.search);
            if(response.status === 200) {
                let data = await response.json();
                this.setState({ hasMore: this.state.healthPlans.length < data.count });
                let newHealthPlans = [...this.state.healthPlans].concat(data.rows);
                this.setState({ healthPlans: newHealthPlans });
            } else if(response.status === 400) {
                let error = await response.json();
                this.setState({error: error.error})
            } else {
                this.setState({error: 'An error has occurred on the server'})
            }
            this.setState({isFetching: false});
        } catch(err) {
            console.error(err);
            this.setState({error: 'An error has occurred'})
        }
    };

    loadMore = async () => {
        this.setState({page: this.state.page + 1});
        try {
            await this.getHealthPlans(this.state.page)
        } catch(err) {
            console.log(err)
        }
    };

    render () {
        return (
            <Container maxWidth='md'>
                <SearchBar label='Search Health Plans By Name' placeholder="Health Plan Name" onChangeText={this.searchHealthPlans}/>
                {this.state.error ? <div>
                    <span className="error-text">{this.state.error}</span>
                </div>: null}
                <HealthPlanListBox healthPlans={this.state.healthPlans} hasMore={this.state.hasMore} loadMore={this.loadMore} isFetching={this.state.isFetching}/>
            </Container>
        )
    }
}

export default DashboardHome;

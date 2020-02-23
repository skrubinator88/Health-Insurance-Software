import React, { Component } from 'react';
import PatientListBox from '../components/dashboard/PatientListBox'
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
            patients: [],
            search: '',
            page: 1,
            hasMore: false,
            isFetching: false
        };
    }

    componentDidMount = async () => {
        try {
            await this.getPatients()
        } catch(err) {
            console.log(err)
        }
    };

    searchPatients = debounce(async (search) => {
        try {
            this.setState({ search: search });
            this.setState({ patients: [] });
            this.setState({ page: 1 });
            await this.getPatients()
        } catch(err) {
            console.log(err)
        }
    }, 400);

    getPatients = async (pageNo) => {
        try {
            this.setState({error: ''});
            this.setState({isFetching: true});
            let response = await FetchServiceModule.fetchPatients(pageNo, this.state.search)
            if(response.status === 200) {
                let data = await response.json();
                this.setState({ hasMore: this.state.patients.length < data.count });
                let newPatients = [...this.state.patients].concat(data.rows);
                this.setState({ patients: newPatients });
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
            await this.getPatients(this.state.page)
        } catch(err) {
            console.log(err)
        }
    };

    render () {
        return (
            <Container maxWidth='md'>
                <SearchBar label='Search Patients By Name' placeholder="John Doe, Janet Doe, etc." onChangeText={this.searchPatients}/>
                {this.state.error ? <div>
                    <span className="error-text">{this.state.error}</span>
                </div>: null}
                <PatientListBox patients={this.state.patients} hasMore={this.state.hasMore} loadMorePatients={this.loadMore} isFetching={this.state.isFetching}/>
            </Container>
        )
    }
}

export default DashboardHome;
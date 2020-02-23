import React, {Component, useEffect} from 'react';
import Header from '../components/dashboard/header';
import DashboardHome from '../pages/DashboardHome'
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import AddPatient from '../pages/AddPatient';
import PatientDetail from '../pages/PatientDetail';
import AddInvoice from "../pages/AddInvoice";
import AdminAccount from "../pages/AdminAccount";
import store from "../store/store";
import {loadUser} from "../actions/authActions";

class Dashboard extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Box>
                    <Header/>
                    <Switch>
                        <Route exact path='/dashboard' component={DashboardHome}/>
                        <Route exact path='/dashboard/addUser' component={AddPatient}/>
                        <Route exact path='/dashboard/patient/:id' component={PatientDetail}/>
                        <Route exact path='/dashboard/patient/:id/addInvoice' component={AddInvoice}/>
                        <Route exact path='/dashboard/admin' component={AdminAccount}/>
                    </Switch>
                </Box>
            </Router>
        );
    }
}
export default Dashboard;
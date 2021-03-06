import React, {Component, useEffect} from 'react';
import Header from '../components/dashboard/header';
import DashboardHome from '../pages/DashboardHome'
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import AddHealthPlan from '../pages/AddHealthPlan';
import HealthPlanDetail from '../pages/HealthPlanDetail';
import AddInvoice from "../pages/AddInvoice";
import AdminAccount from "../pages/AdminAccount";

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
                        <Route exact path='/dashboard/addHealthPlan' component={AddHealthPlan}/>
                        <Route exact path='/dashboard/healthPlan/:id' component={HealthPlanDetail}/>
                        <Route exact path='/dashboard/patient/:id/addInvoice' component={AddInvoice}/>
                        <Route exact path='/dashboard/admin' component={AdminAccount}/>
                    </Switch>
                </Box>
            </Router>
        );
    }
}
export default Dashboard;

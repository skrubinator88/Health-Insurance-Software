import React, {useEffect} from 'react';
import './App.css';
import Dashboard from './routes/dashboard'
import Login from './pages/Login'
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/store";
import {loadUser, logout} from "./actions/authActions";
import ProtectedRoute from "./components/ProtectedRoute";
import FetchService from "./services/fetchService";
import UpdateService from "./services/updateService";
import PostService from "./services/postService";
import UnProtectedRoute from "./components/dashboard/UnProtectedRoute";

export const FetchServiceModule = new FetchService(store, logout);
export const UpdateServiceModule = new UpdateService(store, logout);
export const PostServiceModule = new PostService(store, logout);

function App() {
    useEffect(() => {
        loadUser()
    });
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <UnProtectedRoute path="/" exact component={Login}/>
                        <ProtectedRoute path="/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

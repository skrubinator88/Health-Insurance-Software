import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import UserList from "../components/dashboard/UserList/UserList";
import RoleSelect from "../components/RoleSelect";
import {BackButton, SaveButton} from "../components/Buttons"
import '../styles/AdminAccount.css';
import listActions from "../components/listActions";
import {FetchServiceModule, PostServiceModule, UpdateServiceModule} from "../App";


class AdminAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            role: '',
            users: [],
            errors: {
                listHeader: '',
                newUser: '',
                currentUser: ''
            },
            success: {
                listHeader: '',
                newUser: '',
                currentUser: ''
            }
        }
    }
    componentDidMount = async () => {
        try {
            await this.getUsers();
        } catch(err) {
            console.log(err)
            this.setState({errors: {listHeader: 'An error has occurred'}})
        }
    };

    getUsers = async () => {
        this.setState({
            errors: {listHeader: ''},
            success: {listHeader: ''}
        });
        let response = await FetchServiceModule.fetchUsers();
        if (response.status === 200) {
            let data = await response.json();
            this.setState({users: data})
        } else if (response.status === 400) {
            let error = response.json();
            this.setState({errors: {listHeader: error.error}})
        } else this.setState({errors: {listHeader: 'An error occurred on the server'}})
    };

    createNewUser = async () => {
        this.setState({
            errors: {newUser: ''},
            success: {newUser: ''}
        });
        try {
            let response = await PostServiceModule.postUser(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.role);
            if(response.status === 400) {
                let error = await response.json();
                this.setState({errors: {newUser: error.error} });
            }
            else if(response.status === 200) {
                this.setState({
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    role: '',
                    success: {
                        newUser: 'User successfully saved'
                    }
                });
                await this.getUsers()
            }
            else this.setState({errors: {newUser: 'An error occurred on the server'} });
        } catch(err) {
            console.error(err);
            this.setState({errors: {newUser: 'An error has occurred'} })
        }
    };
    updateUser = async (index) => {
        this.setState({
            errors: {currentUser: ''},
            success: {currentUser: ''}
        })
        try {
            let user = this.state.users[index];
            let response = await UpdateServiceModule.updateUser(user.id, {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                role: user.role
            });
            if(response.status === 200) {
                this.setState({ success: {
                    currentUser: {
                        message:'User successfully updated',
                        index: index
                    }
                }})
            } else if(response.status === 400){
                let error = await response.json();
                this.setState({ errors: {
                        currentUser: {
                            message:error.error,
                            index: index
                        }
                    }})
            } else if(response.status === 401) {
                let error = await response.json();
                this.setState({ errors: {
                        currentUser: {
                            message:error.error,
                            index: index
                        }
                    }});
                setTimeout(()=>{this.props.history.goBack()}, 2000)
            }
            else {
                this.setState({ errors: {
                        currentUser: {
                            message:'An error occurred on the server',
                            index: index
                        }
                    }})
            }
        } catch(err) {
            console.log(err)
            this.setState({ errors: {
                    currentUser: {
                        message:'An error has occurred',
                        index: index
                    }
                }})
        }
    };
    deleteUser = async (index) => {
        this.setState({
            errors: {listHeader: ''},
            success: {listHeader: ''}
        });
        try {
            let user = this.state.users[index];
            let response = await UpdateServiceModule.deleteUser(user.id);
            if(response.status === 200) this.setState({ success: {listHeader: 'User successfully deleted'}});
            if(response.status === 500) this.setState({ errors: {listHeader: 'An error occurred on the server'}});
            await this.getUsers()
        } catch(err) {
            console.log(err)
            this.setState({ errors: {listHeader: 'An error has occurred. Please try again'}});
        }
    };
    editItem = (index, attribute, value) => {
        this.setState({
            users: listActions.editItem(index, this.state.users, attribute, value),
            errors: {currentUser: ''},
            success: {currentUser: ''}
        })
    };
    handleSetFirstName = (e) => {
        this.setState({firstName: e.target.value});
    };
    handleSetLastName = (e) => {
        this.setState({lastName: e.target.value});
    };
    handleSetUsername = (e) => {
        this.setState({username: e.target.value});
    };
    handleSetPassword = (e) => {
        this.setState({password: e.target.value});
    };
    handleSetRole = (e) => {
        this.setState({role: e.target.value});
    };
    handleEditFirstName = (e, index) => {
        this.editItem(index, 'firstName', e.target.value)
    };
    handleEditLastName = (e, index) => {
        this.editItem(index, 'lastName', e.target.value)
    };
    handleEditUsername = (e, index) => {
        this.editItem(index, 'username', e.target.value)
    };
    handleEditPassword = (e, index) => {
        this.editItem(index, 'password', e.target.value)
    };
    handleEditRole = (e, index) => {
        this.editItem(index, 'role', e.target.value)
    };
    render() {
        return (
            <Box>
                <BackButton onClick={()=>{this.props.history.replace('/dashboard')}} body="Home"/>
                <Grid container direction="column">
                        <Grid item xs={12}>
                            <div className="activity-container">
                                <span className="title-text">Users</span>
                                <br/>
                                <span className="subtitle-text">Add new User</span>
                                <br/>
                                {this.state.errors.newUser ? <div>
                                    <span className="error-text">{this.state.errors.newUser}</span>
                                </div> : null}
                                {this.state.success.newUser ? <div>
                                    <span className="success-text">{this.state.success.newUser}</span>
                                </div> : null}
                                <form noValidate>
                                    <TextField
                                        label="First Name"
                                        margin="normal"
                                        onChange={this.handleSetFirstName}
                                        value={this.state.firstName}
                                        variant="outlined"
                                        className='new-user-input'
                                    />
                                    <TextField
                                        label="Last Name"
                                        margin="normal"
                                        onChange={this.handleSetLastName}
                                        value={this.state.lastName}
                                        variant="outlined"
                                        className='new-user-input'
                                    />
                                    <TextField
                                        label="Username"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        onChange={this.handleSetUsername}
                                        value={this.state.username}
                                        variant="outlined"
                                        autoComplete="new-password"
                                        className='new-user-input'
                                    />
                                    <TextField
                                        label="Password"
                                        InputLabelProps={{ shrink: true }}
                                        margin="normal"
                                        autoComplete="new-password"
                                        onChange={this.handleSetPassword}
                                        value={this.state.password}
                                        type="password"
                                        variant="outlined"
                                        className='new-user-input'
                                    />
                                    <br/>
                                    <RoleSelect role={this.state.role} setRole={this.handleSetRole} isEditing={true}/>
                                    <SaveButton onClick={this.createNewUser}/>
                                </form>
                                <Divider variant="middle" style={{margin: 10}}/>
                                {this.state.errors.listHeader ? <div>
                                    <span className="error-text">{this.state.errors.listHeader}</span>
                                </div> : null}
                                {this.state.success.listHeader ? <div>
                                    <span className="success-text">{this.state.success.listHeader}</span>
                                </div> : null}
                               <UserList
                                   errorMessage={this.state.errors.currentUser}
                                   successMessage={this.state.success.currentUser}
                                   users={this.state.users}
                                   handlePassword={this.handleEditPassword}
                                   handleUsername={this.handleEditUsername}
                                   handleFirstname={this.handleEditFirstName}
                                   handleLastname={this.handleEditLastName}
                                   handleRole={this.handleEditRole}
                                   updateUser={this.updateUser}
                                   onRemoveClick={this.deleteUser}
                               />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="activity-container">
                            </div>
                        </Grid>
                </Grid>
            </Box>
        );
    }
}

export default AdminAccount;
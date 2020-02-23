import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField";
import RoleSelect from "../../RoleSelect";


const useStyles = makeStyles(theme => ({
    customerCard: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
        backgroundColor: 'white',
        textAlign: 'left',
    },
    cardName: {
        fontWeight: 500,
        fontSize: 14
    },
    cardCode: {
        float: 'right',
        fontSize: 14
    },
    cardContents: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14
    },
    customerList: {
        marginTop: theme.spacing(5)
    },
    addCustomer: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        textDecoration: 'none'
    },
    linkWrapper: {
        textDecoration: 'none'
    },
    addCustomerIcon: {
        fontSize: 26,
    },
    addCustomerText: {
        fontSize: 25
    },
    itemEditButton: {
        float: 'right',
        margin: 2,
        cursor: 'pointer'
    }
}));

const UserList = ({
                      users,
                      onRemoveClick,
                      handleUsername,
                      handlePassword,
                      handleFirstname,
                      handleLastname,
                      handleRole,
                      updateUser,
                      errorMessage,
                      successMessage}) => {
    const classes = useStyles();
    const [editingItem, setEditingItem] = React.useState(null);

    const handleEditItem = (index) => {
        !editingItem ? setEditingItem(index) : setEditingItem(null)
    };
    const handleUpdateItem = (index) => {
        updateUser(index)
    }
    return (
        <Box>
            <Box className={classes.customerList} >
                <span className="subtitle-text">Registered Users</span>
                <br/>
                {users.length > 0 ? users.map((user, index) => {
                    return (
                        <div>
                            {!errorMessage ? null : errorMessage.index === index ?
                            <span className="error-text">{errorMessage.message}</span>: null}
                            {!successMessage ? null : successMessage.index === index ?
                                <span className="success-text">{successMessage.message}</span>: null}
                            <UserListItem
                                index={index}
                                username={user.username}
                                password={user.password}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                role={user.role}
                                onRemoveClick={onRemoveClick}
                                onToggleEdit={handleEditItem}
                                handleEdit={handleUpdateItem}
                                isEditing={index === editingItem}
                                handleUsername={handleUsername}
                                handlePassword={handlePassword}
                                handleFirstName={handleFirstname}
                                handleLastName={handleLastname}
                                handleRole={handleRole}
                            />
                        </div>
                    );
                }) : <span class="empty-container-text">No users found</span>}
            </Box>
        </Box>
    );
};

const UserListItem = (
    {
        username,
        password,
        firstName,
        lastName,
        role,
        onRemoveClick,
        onToggleEdit,
        handleEdit,
        index,
        isEditing,
        handleUsername,
        handlePassword,
        handleFirstName,
        handleLastName,
        handleRole
    }) => {
    const classes = useStyles();

    const toggleEditButton = (e) => {
        e.preventDefault();
        onToggleEdit(index)
    };

    const handleEditButton = (e) => {
        e.preventDefault()
        handleEdit(index);
        onToggleEdit(index)
    }
    const handleSetUsername = (e) => {
        handleUsername(e, index)
    };
    const handleSetPassword = (e) => {
        handlePassword(e, index);
    };
    const handleSetFirstName = (e) => {
        handleFirstName(e, index);
    };
    const handleSetLastName = (e) => {
        handleLastName(e, index);
    };
    const handleSetRole = (e) => {
        handleRole(e, index);
    };

    return (
        <div>
            <div className={classes.customerCard}>
                <Typography variant="h6">
                        <form noValidate>
                            <TextField
                                label="First Name"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleSetFirstName}
                                value={firstName}
                                InputProps={{
                                    readOnly: !isEditing,
                                }}
                                variant="outlined"
                                className='new-user-input'
                            />
                            <TextField
                                label="Last Name"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleSetLastName}
                                value={lastName}
                                InputProps={{
                                    readOnly: !isEditing,
                                }}
                                variant="outlined"
                                className='new-user-input'
                            />
                            <TextField
                                label="Username"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleSetUsername}
                                value={username}
                                InputProps={{
                                    readOnly: !isEditing,
                                }}
                                variant="outlined"
                                className='new-user-input'
                            />
                            <TextField
                                label="Password"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleSetPassword}
                                value={password}
                                type="password"
                                InputProps={{
                                    readOnly: !isEditing,
                                }}
                                variant="outlined"
                                className='new-user-input'
                            />
                            <br/>
                            <RoleSelect role={role} setRole={handleSetRole} isEditing={isEditing}/>
                        </form>
                </Typography>
                <div>
                    <p>
                        {isEditing ?
                            <Button onClick={handleEditButton}>Done</Button> :
                            <div>
                                <Icon className={classes.itemEditButton} onClick={() => {onRemoveClick(index)}}>highlight_off</Icon>
                                &nbsp;
                                {onToggleEdit !== null ? <Icon className={classes.itemEditButton} onClick={toggleEditButton}>edit</Icon> : null}
                            </div>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserList;
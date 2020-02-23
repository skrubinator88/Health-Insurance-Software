import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Logout from "../Logout";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SUPERUSER } from "../../Globals";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    admin: {
        fontSize: 26
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    spacer: {
        flexGrow: 1
    },
    linkWrapper: {
        textDecoration: 'none'
    },
}));

const Header = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <img src="/logo.png" width="60px"/>
                    <div className={classes.spacer}/>
                    {props.auth.user.name}
                    {props.auth.user.userRole === SUPERUSER ?
                        <Link to='/dashboard/admin' className={classes.linkWrapper}>
                            <IconButton color="inherit">
                                <Icon className={classes.admin}>security</Icon>
                            </IconButton>
                        </Link> : null}
                    <Logout />
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(Header);
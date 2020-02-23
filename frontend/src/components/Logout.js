import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };
    render () {
        return (
            <Fragment>
                <IconButton onClick={this.props.logout} color="inherit">
                    <Icon>exit_to_app</Icon>
                </IconButton>
            </Fragment>
        );
    }
};

export default connect(
    null,
    { logout }
)(Logout);
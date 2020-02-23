import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
    },
}));

const SearchBar = ({label, placeholder, onChangeText}) => {
    const classes = useStyles();

    const onChangeHandler = (e) => {
        onChangeText(e.target.value)
    }
    return (
        <div className={classes.margin}>
            <Grid direction='row' container spacing={1} alignItems="flex-end">
                    <TextField
                        id="outlined-full-width"
                        label={label}
                        style={{ margin: 8 }}
                        placeholder={placeholder}
                        fullWidth
                        onChange={onChangeHandler}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon>search</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />
            </Grid>
        </div>
    );
};

export default SearchBar;
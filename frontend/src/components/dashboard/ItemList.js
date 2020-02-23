import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import SearchBar from '../SearchBar';
import Link from 'react-router-dom/Link';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    customerListBox: {

    },
    customerCard: {
        padding: theme.spacing(1, 4),
        margin: theme.spacing(1),
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

const ItemList = ({ items, onRemoveClick, handleDescription, handlePart, handleQty, handlePrice }) => {
    const classes = useStyles();
    const [editingItem, setEditingItem] = React.useState(null);

    const handleEditItem = (index) => {
        !editingItem ? setEditingItem(index) : setEditingItem(null)
    }

    return (
        <Box>
            <Container className={classes.customerList} >
                {items.length > 0 ? items.map((item, index) => {
                    return (
                        <ItemListItem
                            index={index}
                            description={item.name}
                            price={item.price}
                            qty={item.qty}
                            part={item.part}
                            onRemoveClick={onRemoveClick}
                            onToggleEdit={handleEditItem}
                            isEditing={index === editingItem}
                            handleDescription={handleDescription}
                            handlePart={handlePart}
                            handlePrice={handlePrice}
                            handleQty={handleQty}/>
                    );
                }) : null}
            </Container>
        </Box>
    );
};

const ItemListItem = ({description, price, qty, part, onRemoveClick, onToggleEdit, index, isEditing, handleDescription, handlePart, handlePrice, handleQty}) => {
    const classes = useStyles();

    const handleEditButton = (e) => {
        e.preventDefault();
        onToggleEdit(index)
    }
    const handleSetDescription = (e) => {
        handleDescription(e, index)
    };
    const handleSetPrice = (e) => {
        handlePrice(e, index);
    };
    const handleSetQty = (e) => {
        handleQty(e, index);
    };
    const handleSetPart = (e) => {
        handlePart(e, index)
    };

    return (
        <div>
            <Paper className={classes.customerCard} elevation={1}>
                <Typography variant="h6">
                    {isEditing ?
                        <form noValidate>
                            <TextField
                                label="Description"
                                margin="normal"
                                onChange={handleSetDescription}
                                value={description}
                                className='descriptionField'
                            />
                            <TextField
                                label="Part No."
                                margin="normal"
                                type="number"
                                onChange={handleSetPart}
                                value={part}
                                className='partField'
                            />
                        </form>:
                        <div>
                            <span className={classes.cardName}>Description:&nbsp;{description}</span> <span className={classes.cardCode}>Part #:{part}</span>
                        </div>
                    }
                </Typography>
                <Divider variant={'middle'}/>
                <div className={classes.cardContents}>
                    {isEditing ? <form noValidate>
                            <TextField
                                label="Price"
                                type="number"
                                margin="normal"
                                onChange={handleSetPrice}
                                value={price}
                                className='descriptionField'
                            />
                            <TextField
                                label="Qty"
                                margin="normal"
                                type="number"
                                onChange={handleSetQty}
                                value={qty}
                                className='qtyField'
                            />
                        </form>:
                        <div>
                            <p>
                                <b>price:</b> {price} <br/>
                                <b>qty:</b> {qty}<br/>
                            </p>
                        </div>
                    }
                    <div>
                        <p>
                            {isEditing ?
                                <Button onClick={onToggleEdit}>Done</Button> :
                                <div>
                                    <Icon className={classes.itemEditButton} onClick={() => {onRemoveClick(index)}}>highlight_off</Icon>
                                    &nbsp;
                                    {onToggleEdit !== null ? <Icon className={classes.itemEditButton} onClick={handleEditButton}>edit</Icon> : null}
                                </div>}
                        </p>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default ItemList;
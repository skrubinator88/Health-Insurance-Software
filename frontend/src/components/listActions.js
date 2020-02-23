const editItem = (index, items, attribute, value) => {
    let newItems = [...items];
    newItems[index][attribute] = value;
    return newItems
};

export default editItem;
import React from "react";

// MenuItems Component
const MenuItems = (props) => {

    // this is the individual list item of menuBar
    const {listItem, id} = props;
    return(
        <div className="list-item" id={id}>{listItem}</div>
    )
}

export default MenuItems;
// importing react and menuItems component
import React from "react";
import MenuItems from "./MenuItems";

// send the list of menuItems to MenuItems.js as props
const Menu = (props) => {
    // destructuing the props
    const {menuList, musicList, currentPage} = props;

    // if the currentPage is menuPage menuItems will be displayed else music items will get displayed
    let arrayToRender;
    (currentPage === "menuPage") ? (arrayToRender = menuList) : (arrayToRender = musicList);
   
    // mapping the items according to the page on the menuBar
    return(
        <div className="show" id="list-item-container">
            <h3>IPOD Menu</h3>
            {arrayToRender.map((listItem) => {
            return (
                <MenuItems
                    id={listItem}
                    key={arrayToRender.indexOf(listItem)}
                    listItem={listItem}
                    currentPage={currentPage}
                />
            )  
        })}
        </div>
    ) 
}

export default Menu;
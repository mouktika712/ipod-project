// Importing all the screens and Menu component
import React from 'react';
import Menu from './Menu';
import Games from './Ipod_Screens/Games'
import Coverflow from './Ipod_Screens/Coverflow';
import Music from './Ipod_Screens/Music';
import Settings from './Ipod_Screens/Settings';
import Artists from './Ipod_Screens/Artists';
import Albums from './Ipod_Screens/Albums';
import AllSongs from './Ipod_Screens/AllSongs';

// Screen component
const Screen = (props) => {
    // destructuring the props
    const {menuList, musicList, currentPage, subPage, allSongs} = props;
    
    // assigning the <Menu/> component to MenuBar and sending props to it
    let MenuBar;
    MenuBar = <Menu 
        menuList={menuList}
        musicList={musicList}
        currentPage={currentPage}
        subPage={subPage}
    />;

    // the screenToRender will be decided according the currentPage and subPage
    let screenToRender;

    if(currentPage === "menuPage") {
        if(subPage === "Games") {screenToRender = <Games/>}
        else if(subPage === "Coverflow"){screenToRender = <Coverflow/>}
        else if(subPage === "Settings"){screenToRender = <Settings/>}
    }else{
        if(subPage === "Music"){screenToRender = <Music/>}
        else if(subPage === "Artists") {screenToRender = <Artists/>}
        else if(subPage === "Albums") {screenToRender = <Albums/>}
        else if(subPage === "AllSongs") {
            screenToRender = <AllSongs
                allSongs={allSongs}
            />
        }
    }
    

    // ScreenToRender has been decided....
    return(
        <div className="screen basic-screen">
            {screenToRender}
            {MenuBar} 
        </div>
    )
}

export default Screen;
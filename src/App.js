import React from 'react';
import Screen from './Screen';
import ZingTouch from "zingtouch";
import ButtonsContainer from './ButtonsContainer';

// I REQUEST YOU TO READ THE "README.md" fILE FIRST. *********************************************
// PLEASE MAKE SURE YOU ARE CONNECTED TO THE INTERNET BEFORE STARTING THE PROJECT ***********************************

class App extends React.Component {
  constructor () {
    super();

    // both are used for handling rotation event for menuBar
    this.temp_change_in_angle = 0;
    this.temp_selected = 0;

    // Adding the state to the App Component
    this.state = {
      menuItems: [
        "Coverflow", "Music", "Games", "Settings"
      ],
      musicItems: [
        "AllSongs", "Artists", "Albums"
      ],
      allSongs: [
        {
          songName: "Mere Dholna",
        },
        {
          songName: "Barso Re Megha Megha",
        },
        {
          songName: "Pinga",
        },
        {
          songName: "Deewani Mastani",
        }
      ],
      currentPage: "menuPage",
      subPage:"",
      selected: 0,
      showMenu: true,
      isPaused: true,
      currentlyPlaying: -1,
      songSelected: 0
    }
  }

  // event handler function for play/pause button 
  playPauseButtonClicked = () => {
    let {currentPage, subPage, isPaused, songSelected} = this.state;

    // this button will work only on AllSongs Screen
    if(currentPage === "Music" && subPage === "AllSongs") {

      // if the song is playing...pressing this button will pause it and vice-versa
      if(isPaused === true) {
        isPaused = false;
        document.getElementById(songSelected).play();
        document.getElementById(songSelected+"song").classList.add("currently-playing");  //adding animation to the currently playing song
        // console.log(currentlyPlaying, songSelected, "is Playing");
      }else {
        isPaused = true;
        document.getElementById(songSelected).pause();
        document.getElementById(songSelected+"song").classList.remove("currently-playing");  //removing animation to the currently playing song
        // console.log(currentlyPlaying, songSelected, "is Paused")
      }
      // updating the state of currently playing song and isPaused
      this.setState({isPaused});
      
    }
  }

  // event handler function for right/forward button
  rightButtonClicked = () => {
    let {currentPage, subPage, songSelected, allSongs, isPaused} = this.state;

    // "selected" class is added as we navigate the song list on AllSongs Page

    //But if we press this button while the song is being played(isPaused is false)...the song will pause and the next song will be selected
    if(isPaused === false) {
      this.setState({isPaused: true})
      document.getElementById(songSelected).pause();
      document.getElementById(songSelected+"song").classList.remove("currently-playing");
    }

    // this button should only work on the AllSongs Page
    if(currentPage === "Music" && subPage === "AllSongs") {
      document.getElementById(songSelected+"song").classList.remove("song-selected");
      // if the song selected reaches bottom it should start from 0th index...otherwise it should be incremented
      if(songSelected === allSongs.length - 1) {songSelected = 0;}
      else{songSelected += 1;}
      // adding and removing the song-selected class
      document.getElementById(songSelected+"song").classList.add("song-selected");
      console.log(songSelected);
      this.setState({songSelected});
    }
  }

  // event handler for leftButton/ backward button
  leftButtonClicked = () => {
    let {currentPage, subPage, songSelected, allSongs, isPaused} = this.state;

    // this button has 2 usage (1st: redirecting to menuPage if currentPage is music Page) and
    // (2nd is navigating through the songs on allSongs page)

    // redirecting musicPage --> menuPage only when the menuBar is visible
    if(currentPage !== "menuPage" && document.getElementById('list-item-container').classList.contains('show')) {
      this.setState({currentPage:"menuPage", subPage: "menuPage"});
    }

    // when we are on AllSongs page..this button will work for selecting the next song

    //But if we press this button while the song is being played(isPaused is false)...the song will pause and the next song will be selected
    if(isPaused === false) {
      this.setState({isPaused: true})
      document.getElementById(songSelected).pause();
      document.getElementById(songSelected+"song").classList.remove("currently-playing");
    }
    

    // updating the songSelected just like we do for forward button
    if(currentPage === "Music" && subPage === "AllSongs") {
      document.getElementById(songSelected+"song").classList.remove("song-selected");
      if(songSelected === 0) {songSelected = allSongs.length - 1;}
      else{songSelected -= 1;}
      document.getElementById(songSelected+"song").classList.add("song-selected");
      console.log(songSelected)
      this.setState({songSelected});
    }
  }

  // event handler for select button
  selectButtonClicked = () => {
    // this button should not work when the menuBar is not visible
    if(document.getElementById('list-item-container').classList.contains('hide')){return;}

    let {currentPage, selected, menuItems, musicItems} = this.state;

    // getting the menuBar array according to the currentPage 
    let pageArray;
    (currentPage === "menuPage") && (pageArray = menuItems);
    (currentPage === "Music") && (pageArray = musicItems);


    // Now the array is used to update the currentPage and subPage

    this.menuButtonClicked();
    
    // when we move to music page...both current page and subpage needs to be changed
    if(pageArray[selected] === "Music") {
      this.setState({currentPage: "Music", subPage: "Music"})
    }else {
      this.setState({subPage: pageArray[selected]})
    }
  }

  componentDidMount () {
    let {currentPage, menuItems, musicItems} = this.state;

    // getting the array according the currentPage
    let pageArray = menuItems;
    (currentPage === "menuPage") && (pageArray = menuItems);
    (currentPage === "Music") && (pageArray = musicItems);

    // adding the "selected" class to the 1st item of menuBar
    document.querySelector('.list-item').classList.add('selected');

    // Setting up ZingTouch for rotation detection
    const target = document.getElementById('button-circle');
    var region = new ZingTouch.Region(target);

    region.bind(target, 'rotate', (event) => {
      let {currentPage, musicItems, subPage} = this.state;

      // rotation should be detected when the menuBar is visible
      if(document.getElementById('list-item-container').classList.contains('show')) {

        let dist = event.detail.distanceFromLast;
        this.temp_change_in_angle += dist;

        // for rotation in clockwise direction
        if(this.temp_change_in_angle > 60) {
  
          // checking the currentPage again
          if(currentPage === "Music") {pageArray = musicItems;}
          else if(currentPage === "menuPage"){pageArray = menuItems}

          // removing the "selected" class of previous item (when temp_selected is yet to be updated)
          document.getElementById(pageArray[this.temp_selected]).classList.remove("selected");

          // updating/calculating the temp_selected
          this.temp_selected++;
          this.temp_selected = this.temp_selected % pageArray.length;

          // adding the "selected" class to the newly selected item
          document.getElementById(pageArray[this.temp_selected]).classList.add("selected");
          this.setState({selected: this.temp_selected});
          // resetting for next cycle
          this.temp_change_in_angle = 0;
        }
        // for counter-clockwise direction
        else if(this.temp_change_in_angle < -60) {
          if(currentPage === "Music" && subPage === "Music") {pageArray = musicItems;}

          document.getElementById(pageArray[this.temp_selected]).classList.remove("selected");
          this.temp_selected--;
          if(this.temp_selected === -1) {
            this.temp_selected = pageArray.length - 1;
          }
          this.temp_selected = this.temp_selected % pageArray.length;
          document.getElementById(pageArray[this.temp_selected]).classList.add("selected");
          this.setState({selected: this.temp_selected});
          this.temp_change_in_angle = 0;
        }
      }
    })

  }

  // event handler for menu button/ hamburger icon
  menuButtonClicked = () => {
    const listItemContainer = document.getElementById('list-item-container');

    // if the menu is visible...clicking this will hide the menuBar and vice-versa
    // this is done by toggling the show and hide classes
    if(listItemContainer) {
        if(this.state.showMenu === false){
            listItemContainer.classList.remove("hide");
            listItemContainer.classList.add("show");
            this.setState({showMenu:true});
            console.log("show")
        }

        else if(this.state.showMenu === true){
            listItemContainer.classList.remove("show");
            listItemContainer.classList.add("hide");
            this.setState({showMenu:false});
            console.log("hide")

        }
    } 
  }

  // rendering screen component and ButtonsContainer component while sending props to both
  render() {
    const {menuItems, musicItems, currentPage, showMenu, subPage, allSongs} = this.state;
    return (
      <>
        <div className='app'>

          <Screen 
            menuList={menuItems} 
            musicList={musicItems}
            currentPage={currentPage}
            showMenu={showMenu}
            subPage={subPage}
            allSongs={allSongs}
          />

          <ButtonsContainer
            selectButtonClicked={this.selectButtonClicked}
            leftButtonClicked={this.leftButtonClicked}
            menuButtonClicked={this.menuButtonClicked}
            rightButtonClicked={this.rightButtonClicked}
            playPauseButtonClicked={this.playPauseButtonClicked}
          />

        </div>
        <div id='note'>
            I REQUEST YOU TO READ THE "README.md" fILE FIRST. <br/>
            PLEASE MAKE SURE YOU ARE CONNECTED TO THE INTERNET.
        </div>
      </>
    );
  }
}

export default App;

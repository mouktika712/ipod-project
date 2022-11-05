import React from "react";

// Buttons Component
class Buttons extends React.Component {

    render (){

        // destructuring the props object 
        const {selectButtonClicked, leftButtonClicked, menuButtonClicked, rightButtonClicked,playPauseButtonClicked} = this.props;

        // Every button has an attached event listener
        return(
            // this is the circular button that contains all the other buttons
            <div id="button-circle">

                {/* menu-button or hamburger icon */}
                <div className="buttons" id="hamburger-icon" onClick={menuButtonClicked}>
                    <img alt="" src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png"></img>
                </div>

                {/* container for left and right buttons (forward and backward buttons) */}
                <div id="left-right-button">
                    <div className="buttons" id="left-button" onClick={leftButtonClicked}>
                        <img alt="" src="https://cdn-icons-png.flaticon.com/512/4402/4402628.png"></img>
                    </div>
                    <div className="buttons" onClick={rightButtonClicked}>
                        <img alt="" src="https://cdn-icons-png.flaticon.com/128/660/660276.png"></img>
                    </div>
                </div>

                {/* this is the play pause button for songs */}
                <div className="buttons" onClick={playPauseButtonClicked}>
                    <img alt="" src="https://cdn-icons-png.flaticon.com/512/7960/7960808.png"></img>
                </div>

                {/* this is the select button used to select the menuBar items */}
                <div id="select-button" onClick={selectButtonClicked}></div>
            </div>
        )
    };
}

export default Buttons;
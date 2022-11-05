// importing react and buttons component
import React from 'react';
import Buttons from './Buttons';

// buttonsContainer component
const ButtonsContainer = (props) => {
    // destructuring the props
    const {selectButtonClicked, leftButtonClicked, menuButtonClicked,
    rightButtonClicked, playPauseButtonClicked} = props;

    // sending all the eventHandler functions to Button component
    return(
        <div className='buttons-container'>
            <Buttons 
            selectButtonClicked={selectButtonClicked}
            leftButtonClicked={leftButtonClicked}
            menuButtonClicked={menuButtonClicked}
            rightButtonClicked={rightButtonClicked}
            playPauseButtonClicked={playPauseButtonClicked}
            />
        </div>
    )
}

export default ButtonsContainer;
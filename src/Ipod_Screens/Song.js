// importing react
import React from "react";

// importing all the songs inside songs folder
import one from "./songs/one.mp3";
import two from "./songs/two.mp3";
import three from "./songs/three.mp3";
import four from "./songs/four.mp3";

const Song = (props) => {
    let {song, id} = props;

    // count will take the song file name depending on the id
    let count;
    if(id === 0){count = one}
    else if(id === 1){count = two}
    else if(id === 2){count = three}
    else if(id === 3){count = four}

    // Adding songs and song names
    return(
        <div className="song" id={id + "song"}>
            <div className="song-name"> {song.songName} </div>
            <audio controls id={id}>
                <source src={count}/>
            </audio>
        </div>
    )
}


export default Song;
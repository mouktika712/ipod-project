import React from "react";
import Song from "./Song";

// AllSongs Component
const AllSongs = (props) => {
    const {allSongs} = props;

    // map all the components of allSongs array
    return(
        <div className="size" id="allsongs">
            {allSongs.map((song) => {
                return(
                    <Song 
                        song={allSongs[allSongs.indexOf(song)]}
                        key={allSongs.indexOf(song)}
                        id={allSongs.indexOf(song)}
                    />
                )
            })}
        </div>
    )
}

export default AllSongs;
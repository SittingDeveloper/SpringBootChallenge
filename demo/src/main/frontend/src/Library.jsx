import React from "react";
import Task from "./Task";

function Library(props) {
    return(
        <div>
            <Task strData="Data1" intData={300}/>
            <Task strData="Data2" intData={400}/>
            <Task strData="Data3" intData={500}/>
        </div>
    )
}

export default Library;
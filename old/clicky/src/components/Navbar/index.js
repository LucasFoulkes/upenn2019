import React from "react";
import "./style.css";


function Navbar(props) {
    return (

        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Cartoon Shuffle</span>
            <span className="navbar-brand mb-0 h1">Click To Begin</span>
            <span className="navbar-brand mb-0 h1">Your Score : {props.counter} </span>
            <span className="navbar-brand mb-0 h1">Your Highest Score : {props.high} </span>
            {/*      */}
        </nav>
    );
}


export default Navbar;

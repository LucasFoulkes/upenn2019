import React from "react";
import "./style.css";

function Jumbotron(props) {
    return (
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4" style={{ fontSize: 10 + props.counter * 10 }}>The Game That Clicks!</h1>
                <p class="lead">train your mind</p>
            </div>
        </div>
    );
}

export default Jumbotron;

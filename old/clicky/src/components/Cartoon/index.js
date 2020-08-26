import React from "react";
import "./style.css";

function Cartoon(props) {
  return (
    <div className="card">
      <img alt="none" src={props.image} className="card-img" onClick={() => {
        props.clicked(props.id)
      }
      } />
    </div>
  );
}

export default Cartoon;

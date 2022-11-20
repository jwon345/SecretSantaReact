import React from "react";
import './card.css'

function NameCard(props)
{
    return(
        <div className="parent-div">
            <div className="card-padding">f</div>
            <div className="card">
                {props.name}
            </div>
            <div className="card-padding"></div>
        </div>
    );
}

export default NameCard;
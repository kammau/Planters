import React from "react";

function PlantCard({plant}) {
    return (
        <div>
            <p>{plant.common_name}</p>
        </div>
    )
}

export default PlantCard;
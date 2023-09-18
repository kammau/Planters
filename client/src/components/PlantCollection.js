import React, { useEffect } from "react";

function PlantCollection({user}) {
    useEffect(() => {
        fetch("/collection")
        .then((res) => res.json())
        .then((res) => console.log(res))
    })

    return (
        <div>
            <h1>Welcome to {user} Plant Collection page!</h1>
        </div>
    )
}

export default PlantCollection;
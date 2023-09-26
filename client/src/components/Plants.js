import React, { useEffect, useState } from "react";


function Plants({user}) {
    const [plants, setPlants] = useState()
    const [error, setError] = useState(false)



    useEffect(() => {
        fetch("/plants")
        .then((res) => res.json())
        .then((res) => setPlants(res))
    }, [])

    function handleAdd(plant) {
        fetch(`/plants/${plant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plant)
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
    }

    return (
        <div>
            {plants ? plants.map((plant) => {
                return (
                    <div className="plant_card" key={plant.id}>
                        <h3>{plant.common_name}</h3>
                        <p>{plant.scientific_name}</p>
                        <p>{plant.growing_level}</p>
                        <img src={plant.img} alt={`${plant.common_name} plant`} className="img_resize"/>
                        <button onClick={() => handleAdd(plant)}>Add to Collection</button>
                        <p>{error}</p>
                    </div>
                )
            }) : <h1>error!</h1>}
        </div>
    )
}

export default Plants;
import React, { useEffect, useState } from "react";


function Plants() {
    const [plants, setPlants] = useState()


    useEffect(() => {
        fetch("/plants")
        .then((res) => res.json())
        .then((res) => setPlants(res))
    }, [])

    // useEffect(() => {
    //     fetch("/user_plants")
    // })

    function handleAdd(plant) {
        fetch("/user_plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                common_name: plant.common_name,
                scientific_name: plant.scientific_name,
                growing_level: plant.growing_level,
                img: plant.img,
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.ok) {
                console.log("success!")
            }
        })
    }

    return (
        <div>
            {plants ? plants.map((plant) => {
                return (
                    <div className="plant_card">
                        <h3>{plant.common_name}</h3>
                        <p>{plant.scientific_name}</p>
                        <p>{plant.growing_level}</p>
                        <img src={plant.img} alt={`${plant.common_name} plant`} className="img_resize"/>
                        <button onClick={() => handleAdd(plant)}>Add to Collection</button>
                    </div>
                )
            }) : <h1>error!</h1>}
        </div>
    )
}

export default Plants;
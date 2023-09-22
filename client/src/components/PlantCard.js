import { useFormik } from "formik";
import React, { useState } from "react";

function PlantCard({plant, onUpdate, onDelete}) {
    const [mode, setMode] = useState("view");

    function handleDelete(plant) {
        onDelete(plant)
        fetch(`/plants/${plant.id}`, {
            method: "DELETE",
        })
    }

    const formik = useFormik({
        initialValues: {
            common_name: plant.common_name,
            scientific_name: plant.scientific_name,
            growing_level: plant.growing_level,
            img: plant.img,
        },
        onSubmit: (values) => {
            fetch(`/plants/${plant.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => {
                setMode("view")
                return onUpdate(res)
            })
        }
    })

    return (
        <div>
            {mode === "view" ? (
                <div className="plant_card">
                    <h3>{plant.common_name}</h3>
                    <p>{plant.scientific_name}</p>
                    <p>{plant.growing_level}</p>
                    <img src={plant.img} alt={`${plant.common_name} plant`} className="img_resize"/>
                    <button onClick={() => setMode("edit")}>Edit</button>
                    <button onClick={() => handleDelete(plant)}>Remove</button>
                </div>
            ) : (
                <div className="plant_card"> 
                    <form onSubmit={formik.handleSubmit}>
                        <input type="text" id="common_name" value={formik.values.common_name} onChange={formik.handleChange}/>

                        <input type="text" id="scientific_name" value={formik.values.scientific_name} onChange={formik.handleChange} />

                        <input type="number" id="growing_level" min="1" max="5" value={formik.values.growing_level} onChange={formik.handleChange} />

                        <input type="text" id="img" value={formik.values.img} onChange={formik.handleChange} />

                        <button type="submit">Save Changes</button>
                    </form>
                    <button onClick={() => setMode("view")}>X</button>
                </div>
            )}
        </div>
    )
}

export default PlantCard;
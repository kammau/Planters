import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PlantCard from "./PlantCard";

function PlantCollection() {
    const [plants, setPlants] = useState()

    useEffect(() => {
        fetch("/user_plants")
        .then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {
                    setPlants(res)
                })
            }
        })
    }, [])

    function handleUpdate(updatedPlant) {
        if (plants.length > 0) {
            let filteredPlants = plants.filter((plant) => plant.id !== updatedPlant.id)
            setPlants([updatedPlant, ...filteredPlants])
        } else {
            setPlants([updatedPlant])
        }
    }

    function handleDelete(deletedPlant) {
        if (plants.length > 0) {
            let filteredPlants = plants.filter((plant) => plant.id !== deletedPlant.id)
            setPlants([...filteredPlants])
        } else {
            setPlants(null)
        }
    }

    const formSchema = yup.object().shape({
        common_name: yup.string().required("MUST ENTER A COMMON NAME"),
        scientific_name: yup.string().required("MUST ENTER SCIENTIFIC NAME"),
        growing_level: yup.number().required("MUST ENTER GROWING LEVEL").min(1, "Must Enter a number between 1 and 5!").max(5, "Must Enter a number between 1 and 5!").typeError("Must Enter an Integer"),
        img: yup.string().required("MUST ENTER IMAGE URL")
    })


    const formik = useFormik({
        initialValues: {
            common_name: "",
            scientific_name: "",
            growing_level: "0",
            img: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch("/user_plants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => {
                if (Boolean(plants)) {
                    const updatedPlants = [...plants, res]
                    setPlants(updatedPlants)

                } else {
                    setPlants([res])
                }
                resetForm({ values: "" })
            })
        }
    })
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="collection_form">
                <h3 className="form_header">New Plant Form:</h3>
                <input type="text" id="common_name" placeholder="Common Name" value={formik.values.common_name} onChange={formik.handleChange} className="collection_inputs"/>
                <p className="homeForm_errors">{formik.errors.common_name}</p>

                <input type="text" id="scientific_name" placeholder="Scientific Name" value={formik.values.scientific_name} onChange={formik.handleChange} className="collection_inputs"/>
                <p className="homeForm_errors">{formik.errors.scientific_name}</p>

                <input type="text" id="growing_level" placeholder="Growing Level (1-5)" value={formik.values.growing_level} onChange={formik.handleChange} className="collection_inputs"/>
                <p className="homeForm_errors">{formik.errors.growing_level}</p>

                <input type="text" id="img" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange} className="collection_inputs"/>
                <p className="homeForm_errors">{formik.errors.img}</p>

                <button type="submit" className="form_btn">Add</button>
            </form>
            <h1 className="page_header">Welcome to Your Plant Collection:</h1>
            {plants ? plants.map((plant) => <PlantCard key={plant.id} plant={plant} onUpdate={handleUpdate} onDelete={handleDelete}/>) : <p id="no_plants_mess">Look's like you don't have any plant's yet!</p>}
        </div>
    )
}

export default PlantCollection;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PlantCard from "./PlantCard";

function PlantCollection() {
    const [plants, setPlants] = useState([])
    const [noPlants, setNoPlants] = useState(false)

    useEffect(() => {
        fetch("/user_plants")
        .then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    setPlants(res)
                })
            } else {
                setNoPlants(true)
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
            setPlants([])
            setNoPlants(true)
        }
    }

    const formSchema = yup.object().shape({
        common_name: yup.string().required("MUST ENTER A COMMON NAME"),
        scientific_name: yup.string().required("MUST ENTER SCIENTIFIC NAME"),
        growing_level: yup.number().required("MUST ENTER GROWING LEVEL"),
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
                if (noPlants === true) {
                    setPlants([res])
                    setNoPlants(false)
                } else {
                    const updatedPlants = [...plants, res]
                    setPlants(updatedPlants)
                }
                resetForm({ values: "" })
            })
        }
    })
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" id="common_name" placeholder="Common Name" value={formik.values.common_name} onChange={formik.handleChange}/>
                <p>{formik.errors.common_name}</p>

                <input type="text" id="scientific_name" placeholder="Scientific Name" value={formik.values.scientific_name} onChange={formik.handleChange}/>
                <p>{formik.errors.scientific_name}</p>

                <input type="number" id="growing_level" placeholder="Growing Level (1-5)" min="1" max="5" value={formik.values.growing_level} onChange={formik.handleChange}/>
                <p>{formik.errors.growing_level}</p>

                <input type="text" id="img" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange}/>
                <p>{formik.errors.img}</p>

                <button type="submit">Add</button>
            </form>
            <h1>Welcome to your Plant Collection page!</h1>
            {noPlants === true ? <p>Look's like you don't have any plant's yet!</p> : plants.map((plant) => <PlantCard key={plant.id} plant={plant} onUpdate={handleUpdate} onDelete={handleDelete}/>)}
        </div>
    )
}

export default PlantCollection;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PlantCard from "./PlantCard";

function PlantCollection({user}) {
    const [noPlants, setNoPlants] = useState("false")
    const [plants, setPlants] = useState([])

    const formSchema = yup.object().shape({
        common_name: yup.string().required("MUST ENTER A COMMON NAME"),
        scientific_name: yup.string().required("MUST ENTER SCIENTIFIC NAME"),
        growing_level: yup.number().required("MUST ENTER GROWING LEVEL"),
        img: yup.string().required("MUST ENTER IMAGE URL")
    })

    useEffect(() => {
        fetch("/collection")
        .then((res) => {
            if (res.status === 404) {
                setNoPlants("true")
            } else {
                return res.json()
            }
        })
        .then((res) => setPlants(res))
    }, [])

    const formik = useFormik({
        initialValues: {
            common_name: "",
            scientific_name: "",
            growing_level: "0",
            img: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/collection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => {
                setPlants([...plants, res])
            })
        }
    })
    

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" id="common_name" placeholder="Common Name" value={formik.values.common_name} onChange={formik.handleChange}/>

                <input type="text" id="scientific_name" placeholder="Scientific Name" value={formik.values.scientific_name} onChange={formik.handleChange}/>

                <input type="number" id="growing_level" placeholder="Growing Level (1-5)" min="1" max="5" value={formik.values.growing_level} onChange={formik.handleChange}/>

                <input type="text" id="img" placeholder="Image URL" value={formik.values.img} onChange={formik.handleChange}/>

                <button type="submit">Add</button>
            </form>
            <h1>Welcome to {user} Plant Collection page!</h1>
            {noPlants === "true" ? <p>Look's like you don't have any plants!</p> : plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
        </div>
    )
}

export default PlantCollection;
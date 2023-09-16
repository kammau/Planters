import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

function Signup({setUser}) {
    const [error, setError] = useState("false")

    const formSchema = yup.object().shape({
        username: yup.string().required("MUST ENTER A USERNAME").max(10),
        password: yup.string().required("MUST ENTER A PASSWORD"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((res) => {
                if (res.status === 201) {
                    setUser(values.username)
                }
                else if (res.status === 422) {
                    setError("true")
                }
            })
        }
    })

    return (
        <div className="login">
            <h1 className="logsi_header">SIGNUP</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                {/* <label htmlFor="email">Email</label>
                <input id="email" type="text" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email" /> */}
                
                
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Username (Max 10)" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.username}</p>
                
                <input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.password}</p>
                {/* <label htmlFor="confirmPass">Confirm Password</label>
                <input id="confirmPass" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Confirm Password" /> */}
                <button type="submit" className="logsi_buttons">Signup</button>
            </form>
            {error === "true" ? <p>OOPS... PLEASE ENTER VALID USER INFORMATION</p> : null}
        </div>
    )
}

export default Signup;
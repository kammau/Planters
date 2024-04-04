import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";

function Signup({handleLogin}) {
    const [error, setError] = useState("false")

    const formSchema = yup.object().shape({
        username: yup.string().required("MUST ENTER A USERNAME"),
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
                    handleLogin(values.username)
                }
                else if (res.status !== 201) {
                    setError("true")
                }
            })
        }
    })

    return (
        <div className="login">
            <h1 className="logsi_header">SIGNUP</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                  
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Username" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.username}</p>
                
                <input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.password}</p>

                <button type="submit" className="logsi_buttons">Signup</button>
            </form>
            {error === "true" ? <p className="homeForm_errors">OOPS... PLEASE ENTER VALID USER INFORMATION</p> : null}

            <div id="switch_btns_con">
                <NavLink to="/login"><button className="off_switch">LOGIN</button></NavLink>
                <button className="on_switch">SIGNUP</button>
            </div>
        </div>
    )
}

export default Signup;
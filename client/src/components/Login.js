import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Login({ setUser }) {
    const formSchema = yup

    const formik = useFormik({
        initialValues: {
            username: "",
        }
    })

    return (
        <div>
            <form autoComplete="off">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter your username" />
            </form>
        </div>
    )
}

export default Login;
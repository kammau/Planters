import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

function Signup() {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(10),
        password: yup.string().required("Must enter a password"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fecth
        }
    })

    return (
        <div>
            <form>
                {/* <label htmlFor="email">Email</label>
                <input id="email" type="text" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email" /> */}
                
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter a Username" />
                
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter a Password" />

                {/* <label htmlFor="confirmPass">Confirm Password</label>
                <input id="confirmPass" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Confirm Password" /> */}

            </form>
        </div>
    )
}

export default Signup;
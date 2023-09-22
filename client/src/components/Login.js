import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

function Login({handleLogin}) {
    const [error, setError] = useState("false")

    const formSchema = yup.object().shape({
        username: yup.string().required("MUST ENTER USERNAME"),
        password: yup.string().required("MUST ENTER PASSWORD"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => {
                if (res.status === 200) {
                    handleLogin(values.username)
                }
                else if (res.status === 401) {
                    setError("true")
                }
            })
        }
    });

    return (
        <div className="login">
            <h1 className="logsi_header">LOGIN</h1>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>

                
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Username" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.username}</p>
                
                <input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" className="loginInput"/>
                <p className="homeForm_errors">{formik.errors.password}</p>

                <button type="submit" className="logsi_buttons">Login</button>
            </form>
            {error === "true" ? <p className="homeForm_errors">OOPS... PLEASE ENTER VALID USER INFORMATION</p> : null}
        </div>
    )
}

export default Login;
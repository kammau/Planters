import { useFormik } from "formik";
import * as yup from "yup";

function Login({setUser}) {
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a valid username").max(10),
        password: yup.string().required("Must enter a valid password"),
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
                    setUser(values.username)
                }
            })
        }
    });

    return (
        <div className="login">
            <h1 className="logsi_header">LOGIN</h1>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>

                
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Username" className="loginInput"/>
                
                
                <input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" className="loginInput"/>

                <button type="submit" className="logsi_buttons">Login</button>
            </form>
        </div>
    )
}

export default Login;
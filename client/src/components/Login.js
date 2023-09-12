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
            setUser(values.username)
        }
    });

    return (
        <div>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={formik.values.username} onChange={formik.handleChange} placeholder="Enter your username" />
                
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter your password" />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;
import React from "react";
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/loginslice'
import { useNavigate,Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(addUser(user));
        navigate("/");
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Must be greater than 3')
                .max(15, 'Must be 15 characters or less')
                .required('Field is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Field is required'),
            password: Yup.string()
                .required('Field is required')
                .min(3, 'must be greater than 3')
                .max(9, 'must be 9 or less characters')
        })
    })
    return (
        <div className="App">
            <div className="card">
            <form onSubmit={handleOnSubmit}>
                <h1>SignUp form</h1>
                <input type="text"
                    name="username"
                    placeholder="Enter the username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                /><br />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                ) : null}
                <br />
                <input type="text" 
                name="email" 
                placeholder="Enter the Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                /><br />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
                <br />
                <input type="password" 
                name="password" 
                placeholder="Enter the password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                /><br />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
                <br />
                <button>SignUp</button>
                <p class="link-info mt-3">Already have an account? <Link to='/login'>Login</Link></p>
            </form>
            </div>
        </div>
    )
}

export default Register
import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { loginAsync } from '../reducers/loginslice';
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        dispatch(loginAsync(user)); 
        navigate("/home");
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Field is required'),
            password: Yup.string()
                .required('Field is required')
                .min(3, 'must be greater than 3')
                .max(9, 'must be 9 or less characters')
        })
    })
    
    return(
        <div>
            <form onSubmit={handleOnSubmit} className='centered'>
                <h1 className='loghead'>Login Form</h1>
                <input type="text" 
                name="email" 
                icon="envelope"
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
                <button class="btn btn-info mt-2 ml-5 ">Sign In</button><br />
                <Link to="/forgotpswd">Forgot Password</Link>
                <p>Don't have account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    )
}
export default Login
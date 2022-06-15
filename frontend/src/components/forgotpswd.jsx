import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux'
import { forgotpswd } from '../reducers/loginslice';
import {useNavigate} from 'react-router-dom'

function Forgetpswd(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const pswdreset=useSelector((state)=>{
        return state.users.ispswdreset
    })
    
    const handleOnSubmit=(e)=>{
        e.preventDefault();
       let details={
           email:e.target.email.value,
           password:e.target.password.value
       }
       dispatch(forgotpswd(details))
       if(pswdreset){
           navigate("/login")
       }
       else{
           navigate("/forgotpswd")
       }
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            cpassword:''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Field is required'),
            password: Yup.string()
                .required('Field is required')
                .min(3, 'must be greater than 3')
                .max(9, 'must be 9 or less characters'),
            cpassword: Yup.string()
                .required('Field is required')
                .min(3, 'must be greater than 3')
                .max(9, 'must be 9 or less characters')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })
    })
    return(
        <div>
            <div className='forgot-card'>
            <form onSubmit={handleOnSubmit}>
                <h3 style={{color:"#A91079"}}>Forgot password page</h3><br />
                <input type="text" name="email" placeholder='Enter the email' className='form-control'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}/><br />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
                <br />
                <input type="password" name="password" placeholder='Enter the password' className='form-control'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}/><br />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
                <br />
                <input type="password"  name="cpassword" placeholder='Re-enter the password' className='form-control'
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.cpassword}/><br />
                 {formik.touched.cpassword && formik.errors.cpassword ? (
                    <div className="error">{formik.errors.cpassword}</div>
                ) : null}
                <br />
                <button className='btn btn-dark ml-4'>Submit</button>
            </form>
            </div>
        </div>
    )
}
export default Forgetpswd
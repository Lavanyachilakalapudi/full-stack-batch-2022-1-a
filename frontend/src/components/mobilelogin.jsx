import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { sendOTP, verifyOTP } from "../reducers/loginslice";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Mobilenumber (){ 
    const dispatch =useDispatch();
    const ref=useRef(0)
    const ref2=useRef(0);
    const navigate=useNavigate();
   
    const otpstatus=useSelector((state)=>{
        return state.users.sendOtp
    })
    const handleOnSubmit=(e)=>{
        e.preventDefault()
        const phoneno=e.target.phoneno.value
        dispatch(sendOTP(phoneno))
    }

    const isAuth=useSelector((state)=>{
        return state.users.isAuthenticated
    })
    useEffect(()=>{
        
        isAuth?navigate("/home"):navigate("/mobilelogin")

    },[dispatch,otpstatus,isAuth])
    
    const formik = useFormik({
        initialValues: {
           phoneno:''
        },
        validationSchema: Yup.object({
            phoneno: Yup.string()
                .required('Field is required')
                .min(10, 'must be 10 numbers')
                .max(10, 'must be 10 numbers')
        })
    })

    return (
        <div className='m-5 card p-3  mx-auto sh  ' style={{ width: '600px' }}>
            <form className="form" onSubmit={handleOnSubmit}>
                <h3>Login form</h3><br />
                <input type="number" placeholder="enter the phone number" name="phoneno" 
                className="form-control mb-4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneno}
                ref={ref2}
                />
                {formik.touched.phoneno && formik.errors.phoneno ? (
                    <div className="error">{formik.errors.phoneno}</div>
                ) : null} 
                <button className="btn btn-info mb-4">Send OTP</button><br />
                
                <p>Don't have account? <Link to='/register'>Register</Link></p>
            </form>
            {
                    otpstatus && <div>
                        <input type="number" name="otp" placeholder="Enter the otp" ref={ref} className="form-control"/>
                        <button onClick={()=>{
                            console.log("*8888",ref.current.value);
                            dispatch(verifyOTP({phoneno:ref2.current.value,otp:ref.current.value}))
                        }} className="btn btn-info ml-4">Login</button>
                        
                    </div>
                    
                }
        </div>
    )
}
export default Mobilenumber
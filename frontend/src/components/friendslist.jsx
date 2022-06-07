import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { getExpenses } from '../reducers/expensereducer';
import {useNavigate} from 'react-router-dom'

function FriendsList(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [username,setUsername]=useState();
    const user_exps=useSelector((state)=>{
        return state.expense.expenses
    })
    
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        setUsername(user.username)
        dispatch(getExpenses(user.id))
    },[dispatch])
    return(
        <div>
              <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>List of expenses Created by {username} </h3></a>
                    <form class="d-flex" role="search">
                    <button class="btn btn-primary" onClick={()=>{
                                navigate("/home");
                              }}>Back</button> 
                    </form>
                </div>
            </nav> 
            {
                user_exps && user_exps.map((exp)=>{
                    return(
                        <div className='expCard'>
                            <h3 className='expname'>Exp_Name : {exp.exp_name}</h3>
                            <h4 className='amount'>Expense Amount :{exp.amount}</h4>
                        </div>
                    )
                })
            }
        </div>
    )

}
export default FriendsList
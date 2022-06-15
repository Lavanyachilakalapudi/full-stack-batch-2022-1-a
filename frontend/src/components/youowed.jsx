import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getYouowed ,settleUp} from '../reducers/expensereducer';
import { useState } from 'react';


function Youowed() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user=JSON.parse(localStorage.getItem('user'))
    const [exid,setexid]=useState();
    
    const owedList=useSelector((state)=>{
        return state.expense.owedList
    })

    console.log("owed list",owedList)


    useEffect(() => {       
        dispatch(getYouowed(user.id))
    }, [dispatch])

    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>Settle UP</h3></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/home");
                        }}>Back</button>
                    </form>
                </div>
            </nav>
            <div className=" mx-auto sh">
                <table className="table table-striped table-hover" style={{ "width": "600px" }} >
                    <thead>
                        <tr>
                            <th scope="col">Expense Id</th>
                            <th scope="col">Expense Name</th>
                            <th scope="col">Created_by</th>
                            <th scope="col">Owed amount</th>
                            <th scope="col">Settle amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            owedList && owedList.map((mem, i) => {
                                return (
                                    <tr>
                                        <td>{mem.id}</td>
                                        <td>{mem.exp_name}</td>
                                        <td>{mem.username}</td>
                                        {
                                            mem.settle?<td style={{color:"green"}}>{mem.divamount}</td>: <td style={{color:"red"}} >-{mem.divamount}</td>
                                        }
                                        {
                                            mem.settle?<td><button className='btn btn-info' onClick={()=>
                                                
                                                { 
                                                    dispatch(settleUp({exp_id:mem.id,user_id:user.id}))
                                                }} disabled>Settle up</button></td>:
                                            <td><button className='btn btn-info' onClick={()=>dispatch(settleUp({exp_id:mem.id,user_id:user.id}))}>Settle up</button></td>
                                        }
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Youowed
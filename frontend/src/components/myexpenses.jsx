import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses } from '../reducers/expensereducer';
import { useNavigate } from 'react-router-dom'

function Myexpenses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const user_exps = useSelector((state) => {
        return state.expense.expenses
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUsername(user.username)
        dispatch(getExpenses(user.id))
    }, [dispatch])
    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>List of expenses Created by {username} </h3></a>
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
                            <th scope="col">S.No</th>
                            <th scope="col">Expense Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user_exps && user_exps.map((exp, i) => {
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <td>{exp.exp_name}</td>
                                        <td>{exp.amount}</td>
                                        <td><button className='btn btn-warning' onClick={()=>navigate(`/expdetails/${exp.exp_name}/${exp.amount}/${exp.id}`)}>Details</button></td>
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
export default Myexpenses
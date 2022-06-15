import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getOwedyou } from '../reducers/expensereducer';



function Expdetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const details = useParams()
    
    const owedyou=useSelector((state)=>{
        return state.expense.owedyou
    })

    const settle=useSelector((state)=>{
        return state.expense.settle
    })

    useEffect(()=>{
        dispatch(getOwedyou(details.id))
    },[dispatch])
    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>Settle UP</h3></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/myexpense");
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
                            <th scope="col">Amount</th>
                            <th scope="col">Friends</th>
                            <th scope="col">Owed amount</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        owedyou && owedyou.map((mem)=>{
                            return(
                                <tr>
                                <td>{details.id}</td>
                                <td>{details.exp}</td>
                                <td>{details.i}</td>
                                <td>{mem.username}</td>
                                <td className='owed'>+{mem.divamount}</td>
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
export default Expdetails
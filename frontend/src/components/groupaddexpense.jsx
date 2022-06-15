import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGroupMembers, getuserGroups } from '../reducers/groupslice';
import {addExpense} from '../reducers/expensereducer'

function Groupexpense() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [grpmembers, setMembers] = useState([]);
    const [gid,setGid]=useState();
    const user = useSelector((state) => {

        return state.users.user
    })

    const groups = useSelector((state) => {
        return state.group.groups
    })

    const members = useSelector((state) => {
        return state.group.groupMembers
    })
    console.log(members);

    const handleOnSubmit = (e) => {
   
        console.log(grpmembers)
        let expense = {
                created_by: user.id,
                amount: e.target.amount.value,
                exp_name: e.target.exp_name.value,
                participants: grpmembers,
                gid:gid,
                settle:false
            
            }
        dispatch(addExpense(expense));
    }
    useEffect(() => {
        dispatch(getuserGroups(user.id))
    }, [dispatch])


    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>Settle UP</h3></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/expchoice");
                        }}>Back</button>
                    </form>
                </div>
            </nav>
            <div className='m-5 card p-3  mx-auto sh ' style={{ width: '600px' }}>
                <form className='form' onSubmit={handleOnSubmit}>
                    <h3>Add Expense form</h3>
                    <input type="text" placeholder='Enter expense name' name='exp_name' className='form-control' /><br />
                    <input type="text" placeholder='Enter the amount' name='amount' className='form-control' /><br />
                    <h3>{user.username} groups list</h3>
                    <div class="accordion" id="accordionExample">
                        {
                            groups && groups.map((grp) => {
                                return (
                                    <div class="card">
                                        <div class="card-header" id={grp.id}>
                                            <h2 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#" + grp.groupname.replace("", "")} aria-expanded="false" aria-controls={grp.groupname.replace("", "")} onClick={() => {setGid(grp.id);dispatch(getGroupMembers(grp.id))}}>
                                                    {grp.groupname}
                                                </button>
                                            </h2>
                                        </div>
                                        <div id={grp.groupname.replace("", "")} class="collapse show" aria-labelledby={grp.id} data-parent="#accordionExample">

                                            {
                                                members && members.map((mem) => {
                                                    return (
                                                        <div class="card-body">
                                                            <input type="checkbox" name={mem.username} value={mem.id} onChange={(e) => {
                                                                if (e.target.checked) { setMembers([...grpmembers, e.target.value]) }
                                                            }} />
                                                            <label>{mem.username}</label>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type='submit' className='btn btn-info' >Add expense</button>
                </form>
            </div>
        </div>
    )
}
export default Groupexpense
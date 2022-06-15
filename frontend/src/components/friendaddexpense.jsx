import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addExpense, getExpenses } from '../reducers/expensereducer'
import { useNavigate } from 'react-router-dom'
import { getFrnds } from '../reducers/friendslice';
import { getAllGroups, getGroupMembers } from '../reducers/groupslice';

function Addexpenses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const currentUser = useSelector((state) => {

        return state.users.user
    })
    const handleOnSubmit = (e) => {
        
        let expense = {
            created_by: currentUser.id,
            amount: e.target.amount.value,
            exp_name: e.target.exp_name.value,
            participants: friends,
            gid:null,
            settle:false
        }
        dispatch(addExpense(expense));
        setFriends('');
    }
    useEffect(() => {
        dispatch(getExpenses(currentUser.id))
        dispatch(getFrnds(currentUser.id))
    }, [dispatch])

    const friendsList = useSelector((state) => {
        return state.friend.friends
    })

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
                    <h3>{currentUser.username} friends list</h3>
                    {
                        friendsList && friendsList.map((friend) => {
                            return (
                                <div>
                                    <input type="checkbox" name={friend.username} value={friend.id} onChange={(e) => {
                                        if (e.target.checked) { setFriends([...friends, e.target.value]) }
                                    }} />&nbsp;&nbsp;
                                    <label>{friend.username}</label>
                                </div>
                            )
                        })
                    }    
                    <button type='submit' className='btn btn-info' >Add expense</button>
                </form>
            </div>
        </div>
    )

}
export default Addexpenses
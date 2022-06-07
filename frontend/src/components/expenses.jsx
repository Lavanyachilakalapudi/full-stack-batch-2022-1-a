import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {addExpense, getExpenses} from '../reducers/expensereducer'
import {useNavigate} from 'react-router-dom'
import { getFrnds } from '../reducers/friendslice';

function Expenses(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [friends,setFriends]=useState([]);
    const currentUser=useSelector((state)=>{
       
        return state.users.user
    })
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        let expense={
            created_by:currentUser.id,
            amount:e.target.amount.value,
            exp_name:e.target.exp_name.value,
            participants:friends
        }
        dispatch(addExpense(expense));
        // console.log("friendsList",friends,e.target.exp_name.value);
    }
    useEffect(()=>{
        dispatch(getExpenses(currentUser.id))
        dispatch(getFrnds(currentUser.id))
    },[dispatch])
    
    const friendsList=useSelector((state)=>{
        return state.friend.friends
    })
    return(
        <div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" placeholder='Enter expense name' name='exp_name'/>
                    <input type="text" placeholder='Enter the amount' name='amount'/><br />
                <h3>{currentUser.username} friends list</h3>
                {   
                    friendsList && friendsList.map((friend)=>{
                        return(
                            <div>
                                <input type="checkbox" name={friend.username}  value={friend.id} onChange={(e)=>{
                                    if(e.target.checked){setFriends([...friends,e.target.value])}
                                }}/>&nbsp;&nbsp;
                                <label>{friend.username}</label>
                            </div>
                        )
                    })
                }
                    <button type='submit' >Add expense</button>
                    <button onClick={()=>navigate("/home")}>Back</button>
                </form>
            </div>
        </div>
    )

}
export default Expenses
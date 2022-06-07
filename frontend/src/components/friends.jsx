import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getFrnds,addFriend} from '../reducers/friendslice'

function Friends() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [femail,setEmail]=useState();

    useEffect(()=>{
      
        const loginUser=JSON.parse(localStorage.getItem('user'));
        dispatch(getFrnds(loginUser.id));
    },[dispatch])

    const friendsList=useSelector((state)=>{
        return state.friend.friends;
    })
    console.log("friendslist",friendsList);
    return (
        <div>
            <h1>Friends .jsx</h1>
            <input type="email" placeholder='Enter the friend email' name="femail" value={femail} onChange={(e)=>setEmail(e.target.value)} />
            <button onClick={()=>{
                dispatch(addFriend(femail));
                setEmail('');
            }}>Add Friend</button>
            <button onClick={()=>navigate("/home")}>Back</button>
            {
                friendsList && friendsList.map((friend)=>{
                    return(
                        <li>{friend.username}</li>
                    )
                })
            }
        </div>
    )
}
export default Friends
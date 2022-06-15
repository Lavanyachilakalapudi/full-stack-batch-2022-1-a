import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {addGroup} from '../reducers/groupslice'
import {useNavigate} from 'react-router-dom'
import { getFrnds } from '../reducers/friendslice';

function CreateGroup(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [friends,setFriends]=useState([]);
    const currentUser=useSelector((state)=>{
       
        return state.users.user
    })
    const friendsList=useSelector((state)=>{
        return state.friend.friends
    })
    const handleOnSubmit=(e)=>{
        
        let groupdetails={
            created_by:currentUser.id,
            groupname:e.target.groupname.value,
            members:friends
        }
        dispatch(addGroup(groupdetails));
        setFriends('');
    }
    useEffect(()=>{
        dispatch(getFrnds(currentUser.id))
    },[dispatch])
    

    return(
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
            <div className='m-5 card p-3  mx-auto sh ' style={{ width: '600px' }}>
                <form className='form' onSubmit={handleOnSubmit}>
                    <h3>Create group form</h3>
                    <input type="text" placeholder='Enter group name' name='groupname' className='form-control'/><br />
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
                    <button type='submit' className='btn btn-info' >Create Group</button>
                </form>
            </div>
        </div>
    )

}
export default CreateGroup
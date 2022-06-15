import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFrnds, addFriend, getAllEmails } from '../reducers/friendslice'
import Searchable from 'react-searchable-dropdown';

function Addfriends() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [femail, setEmail] = useState();
    const options=[];
    useEffect(() => {

        const loginUser = JSON.parse(localStorage.getItem('user'));
        dispatch(getFrnds(loginUser.id));
        dispatch(getAllEmails())
    }, [dispatch])

    const friendsList = useSelector((state) => {
        return state.friend.friends;
    })

    const emails = useSelector((state) => {
        return state.friend.emails
    })

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
            <div className='m-5 card p-3  mx-auto sh  ' style={{ width: '600px' }}>
                <form className='form'>
                    <h1>Add friend form</h1><br />
                    {
                        emails.map((email,i)=>{
                            console.log(email);
                            options.push({value:email.email,label:email.email})
                        })
                    }
                    <Searchable 
                        hideSelected
                        className="form-control"
                        options={options}
                        onSelect={(value)=>{
                            setEmail(value);
                        }}
                    ></Searchable><br />
                    <button className='btn btn-primary ' onClick={() => {
                        dispatch(addFriend(femail));
                    }}>Add Friend</button><br />
                </form>
            </div>
        </div>
    )
}
export default Addfriends
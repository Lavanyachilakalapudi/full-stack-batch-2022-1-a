import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupMembers, getuserGroups } from '../reducers/groupslice';


function Groupscreen(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user = useSelector((state) => {
        return state.users.user
    })
    const groups=useSelector((state)=>{
        return state.group.groups
    })

    const members = useSelector((state) => {
        return state.group.groupMembers
    })
    useEffect(()=>{
        dispatch(getuserGroups(user.id));
    },[dispatch])

    
    return(
        <div>
             <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>Groups</h3></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/home");
                        }}>Back</button>
                    </form>
                </div>
            </nav>
            <div class="accordion" id="accordionExample">
                        {
                            groups && groups.map((grp) => {
                                return (
                                    <div class="card w-100">
                                        <div class="card-header" id={grp.id}>
                                            <h2 class="mb-0">
                                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#" + grp.groupname.replace("", "")} aria-expanded="false" aria-controls={grp.groupname.replace("", "")} onClick={() => {dispatch(getGroupMembers(grp.id))}}>
                                                    {grp.groupname}
                                                </button>
                                            </h2>
                                        </div>
                                        <div id={grp.groupname.replace("", "")} class="collapse show" aria-labelledby={grp.id} data-parent="#accordionExample">
                                        <ol>
                                            {
                                                members && members.map((mem) => {
                                                    return (
                                                        <div class="card-body">
                                                            
                                                            <li>{mem.username}</li>
                                                        </div>
                                                    )
                                                })
                                            }

                                            </ol>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
        </div>
    )
}
export default Groupscreen
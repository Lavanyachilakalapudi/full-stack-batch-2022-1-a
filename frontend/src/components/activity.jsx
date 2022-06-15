import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllactivities } from "../reducers/groupslice";

function Activity() {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const user=JSON.parse(localStorage.getItem('user'))
    console.log("user.id",user.id)
    useEffect(()=>{
        dispatch(getAllactivities(user.id))
    },[dispatch])
    
    const activitylogs=useSelector((state)=>{
        return state.group.activities
    })
    console.log(activitylogs)
    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>{user.username} Activity logs</h3></a>
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
                            <th scope="col">Activity Id</th>
                            <th scope="col">Activity Name</th>
                            <th scope="col">Created_At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activitylogs && activitylogs.map((a, i) => {
                                return (
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{a.name}</td>
                                        <td>{a.created_at}</td>
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
export default Activity
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFrnds } from '../reducers/friendslice';
import { useNavigate } from 'react-router-dom'
function MYfrndlist(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const frnds = useSelector((state) => {
        return state.friend.friends
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUsername(user.username)
        dispatch(getFrnds(user.id))
    }, [dispatch])
    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>{username} friend list</h3></a>
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
                            <th scope="col"> Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            frnds && frnds.map((frnd, i) => {
                                console.log(frnd);
                                return (
                                    <tr>
                                        <th scope="col">{i + 1}</th>
                                        <td>{frnd.username}</td>
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
export default MYfrndlist
import React from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {setIsAuthenticated}from '../reducers/loginslice'

function Home() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isAuthenticated=useSelector((state) => {  
        return state.users.isAuthenticated;
      });
    return (
        <div>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h1 style={{ color: "white" }}>Settle UP</h1></a>
                    <form class="d-flex" role="search">
                    <button class="btn btn-primary" onClick={()=>{
                                navigate("/about");
                              }}>About</button>&nbsp;&nbsp;
                    <button class="btn btn-primary" onClick={()=>{window.localStorage.clear()
                                dispatch(setIsAuthenticated(false));
                                navigate("/login");
                              }}>Logout</button> 
                    </form>
                </div>
            </nav>  
            <h1 className='subhead'>Keep track of shared expenses!!!</h1>
            <Link to="/friends">Add Friends</Link> &nbsp;&nbsp;
            <Link to="/expense">Add Expenses</Link> &nbsp;&nbsp;
            <Link to="/friendslist">Friends List</Link> &nbsp;&nbsp;
        </div>
    )
}
export default Home
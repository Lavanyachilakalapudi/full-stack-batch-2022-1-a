import React from "react";
import {useNavigate} from 'react-router-dom'

function About(){
    const navigate=useNavigate();
    return(
        <div>
             <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h3 style={{ color: "white" }}>Settle Up </h3></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/home");
                        }}>Back</button>
                    </form>
                </div>
            </nav>
            <div className='m-5 card p-3  mx-auto sh  ' style={{ width: '600px' }}>
            <form className="form">
                <h1>Admin Info</h1>
                <p>Company Name: West Agile labs</p>
                <p>Developer: xxxxxxxxx</p>
                <p>Contact : 7054539821</p>
            </form>
            </div>
        </div>
    )
}
export default About
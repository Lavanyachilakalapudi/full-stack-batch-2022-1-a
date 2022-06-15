import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

function Expchoice(){
    const [radiovalue,setRadiovalue]=useState();
    const navigate=useNavigate();
    const handleOnSubmit=()=>{
        if(radiovalue==="friend"){
           navigate("/friendexpense")
        }
        else{
            navigate("/groupexpenses")
        }
    }


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
        <div className='m-5 card p-3  mx-auto sh  ' style={{ width: '600px' }}>
            <form onSubmit={handleOnSubmit} className="form">
                <h4>Select your choice to whom you want to add the expense?</h4>
                <input type="radio" name="expchoice" value="friend" onChange={(e)=>{setRadiovalue(e.target.value)}} />
                <label htmlFor="friend">Friends</label> &nbsp;&nbsp;
                <input type="radio" name="expchoice" value="group" onChange={(e)=>{setRadiovalue(e.target.value)}}  />
                <label htmlFor="group">Group</label><br />
                <button className='btn btn-primary'>continue</button>
            </form>
        </div>
        </div>
    )
}
export default Expchoice
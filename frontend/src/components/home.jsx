import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../reducers/loginslice'
import Footer from './footer'

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isAuthenticated = useSelector((state) => {
    //     return state.users.isAuthenticated;
    // });
    // console.log(isAuthenticated);
    return (
        <div style={{overflowY: "auto",padding:"bottom"}}>
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><h1 style={{ color: "white" }}>Settle UP</h1></a>
                    <form class="d-flex" role="search">
                        <button class="btn btn-primary" onClick={() => {
                            navigate("/about");
                        }}>About</button>
                        <button class="btn btn-primary ml-5" onClick={() => {
                            window.localStorage.clear()
                            dispatch(setIsAuthenticated(false));
                            navigate("/mobilelogin");
                        }}>Logout</button>
                    </form>
                </div>
            </nav>
            <h1 className='subhead'>Keep track of shared expenses!!!</h1>
            <div style={{display:"flex",flexDirection: "row",flexWrap:'wrap'}}>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://t4.ftcdn.net/jpg/04/25/71/35/360_F_425713577_NiGamkYizLrt347PuJmtUVCQl3BIaKRo.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Add Friend</h5>
                            <p class="card-text">Add new friend to share the expenses</p>
                            <Link to="/friends" className='btn btn-primary'>Add Friends</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://cdn0.iconfinder.com/data/icons/social-network-50/68/friends_list-512.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Friends List</h5>
                            <p class="card-text">Get the friends list and know the owe amount</p>
                            <Link to="/myfrndlist" className='btn btn-primary'>MyFriendList</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDER8YJBdEVfHSn-1PLGFDsfSytgV7fQMuFA&usqp=CAU" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Add Expense</h5>
                            <p class="card-text">Add a new expense that you have spent</p>
                            <Link to="/expchoice" className='btn btn-primary'>Add Expenses</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/313/313062.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">My ExpenseList</h5>
                            <p class="card-text">Get the expenses you have spent on events</p>
                            <Link to="/myexpense" className='btn btn-primary'>My Expenses</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://www.freeiconspng.com/thumbs/payment-icon/buy-gain-income-money-pay-payment-icon--19.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">You owed amount</h5>
                            <p class="card-text">Get the expenses that you have to pay</p>
                            <Link to="/youowed" className='btn btn-primary'>You owed</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small/user_icon_007.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Create Group</h5>
                            <p class="card-text">Create a new group </p>
                            <Link to="/creategroup" className='btn btn-primary'>create group</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://icon-library.com/images/profiles-icon/profiles-icon-11.jpg" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Groups list</h5>
                            <p class="card-text">Get the created groups list</p>
                            <Link to="/groupscreen" className='btn btn-primary'>Group list</Link>
                        </div>
                </div>
                <div class="card ml-4" style={{width: "15rem"}}>
                    <img src="https://icon-library.com/images/history-icon-png/history-icon-png-4.jpg" class="card-img-top p-3" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Activity logs</h5>
                            <p class="card-text">Get your activity list</p>
                            <Link to="/activity" className='btn btn-primary'>Activity logs</Link>
                        </div>
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>

    )
}
export default Home
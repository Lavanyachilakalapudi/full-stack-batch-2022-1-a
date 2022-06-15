import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import Addfriends from './components/addfriend'
import Addexpenses from './components/friendaddexpense'
import Myexpenses from './components/myexpenses';
import Forgetpswd from './components/forgotpswd';
import MYfrndlist from './components/myfrndlist';
import About from './components/about';
import Expdetails from './components/expensedetails';
import Youowed from './components/youowed';
import CreateGroup from './components/creategroup';
import Expchoice from './components/addexpencechoice';
import Groupexpense from './components/groupaddexpense';
import Groupscreen from './components/groupsscreen';
import Activity from './components/activity';
import Mobilenumber from './components/mobilelogin';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mobilelogin" element={<Mobilenumber />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/friends" element={<Addfriends />}></Route>
          <Route path="/friendexpense" element={<Addexpenses />}></Route>
          <Route path="/groupexpenses" element={<Groupexpense />}></Route>
          <Route path="/expchoice" element={<Expchoice />}></Route>
          <Route path="/myexpense" element={<Myexpenses />}></Route>
          <Route path="/forgotpswd" element={<Forgetpswd />}></Route>
          <Route path="/myfrndlist" element={<MYfrndlist />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/activity" element={<Activity />}></Route>
          <Route path="/expdetails/:exp/:i/:id" element={<Expdetails />}></Route>
          <Route path="/groupscreen" element={<Groupscreen />}></Route>
          <Route path="/youowed" element={<Youowed />}></Route>
          <Route path="/creategroup" element={<CreateGroup />}></Route>
          <Route path="/" element={<App />}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

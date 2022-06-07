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
import Friends from './components/friends'
import Expenses from './components/expenses'
import FriendsList from './components/friendslist';
import Forgetpswd from './components/forgotpswd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/expense" element={<Expenses />}></Route>
          <Route path="/friendslist" element={<FriendsList />}></Route>
          <Route path="/forgotpswd" element={<Forgetpswd />}></Route>
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

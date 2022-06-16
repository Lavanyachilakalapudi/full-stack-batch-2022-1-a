import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{},
    isAuthenticated: false,
    ispswdreset:false,
    sendOtp:false
};
const loginslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setIsAuthenticated: (state, action) => {
         
            state.isAuthenticated = action.payload;
        },
        setIspswdreset:(state,action)=>{
            state.ispswdreset = action.payload
        },
        setSendotp:(state,action)=>{
            state.sendOtp = action.payload
        }

    },
});
export const loginAsync = (user) => {
    return async (dispatch) => {
        const response = await fetch(' http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const res = await response.json();
        if (res.success) {
            dispatch(setUser(res.loggeduser));
            dispatch(setIsAuthenticated(true));
            localStorage.setItem('user',JSON.stringify(res.loggeduser));
            localStorage.setItem('token', res.token);
        } 
        else{
            alert(res.message);
        }

    };
};

export const addUser = (user) => {
    console.log("adduser loginslice")
    return async (dispatch) => {
        const response = await fetch(' http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const res=await response.json();
        if(res.errors){
            alert("validation error")
        }
    };
};


export const forgotpswd = (user) => {

    return async (dispatch) => {
        const response = await fetch(' http://localhost:8080/forgetpswd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const res=await response.json();
        if(res.success){
            alert(res.message);
            dispatch(setIspswdreset(true));
        }
        else{
            alert(res.message)
            dispatch(setIspswdreset(false))
        }
    };
};

export const sendOTP=(phoneno)=>{
    console.log("sendotp",phoneno)
    return async (dispatch)=>{
        const response= await fetch(`http://localhost:8080/sendVerificationCode`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({phoneno}),
        })
        const res=await response.json();
        if(res.success){
            dispatch(setSendotp(true))
        }
    }
}

export const verifyOTP=(details)=>{
    console.log("loginslice",details)
    return async (dispatch)=>{
        const response= await fetch(`http://localhost:8080/verifyOTP`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
        })
        const res=await response.json();
        if(res.success){     
            dispatch(setIsAuthenticated(true));
            localStorage.setItem('user',JSON.stringify(res.user));
        }
    }
}
export const { setUser, setIsAuthenticated ,setIspswdreset, setSendotp} = loginslice.actions;
export default loginslice.reducer;
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{},
    isAuthenticated: false,
    ispswdreset:false
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
        console.log("***",res)
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
    };
};


export const forgotpswd = (user) => {
    console.log("adduser loginslice",user)
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

export const { setUser, setIsAuthenticated ,setIspswdreset} = loginslice.actions;
export default loginslice.reducer;
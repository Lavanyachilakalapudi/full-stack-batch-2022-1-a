import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    friends:[],
    emails:[],
};
const friendslice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
       setFriend:(state, action) => {
        state.friends = action.payload;
    },
    setParticipants:(state,action)=>{
        state.participants=action.payload
    },
    setEmails:(state,action)=>{
        state.emails=action.payload
    }
    },
});

export const getFrnds=(id)=>{
    
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getfriends/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            dispatch(setFriend(res.friendList));
        }
    };
}


export const addFriend=(email)=>{
    const user=JSON.parse(localStorage.getItem('user'))
    return async (dispatch)=>{
        const response=await fetch(`http://localhost:8080/newFriend/${email}/${user.id}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
        
            dispatch(getFrnds(user.id));
        }
    }
}

export const getAllEmails=()=>{
    
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getAllEmails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            dispatch(setEmails(res.emailList));
        }
    };
}

export const { setFriend , setParticipants ,setEmails} = friendslice.actions;
export default friendslice.reducer;
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    allgroups:[],
    groups:[],
    groupMembers:[],
    activities:[]
};
const groupslice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setAllgroups:(state,action)=>{
            state.allgroups=action.payload
        },
        setGroups:(state,action)=>{
            state.groups=action.payload
        },
        setGroupMembers:(state,action)=>{
            state.groupMembers=action.payload
        },
        setAllactivities:(state,action)=>{
            state.activities=action.payload
        }

    },
});

export const getuserGroups=(id)=>{

    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getgroups/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            
            dispatch(setGroups(res.groupsList));
        }
    };
}

export const getGroupMembers=(gid)=>{

    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getGroupMembers/${gid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            dispatch(setGroupMembers(res.membersList));
        }
    };
}

export const getAllGroups=()=>{

    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getAllgroups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            dispatch(setAllgroups(res.groupsList));
        }
    };
}
export const addGroup=(group)=>{
    
    const user=JSON.parse(localStorage.getItem('user'))
    return async (dispatch)=>{
        const response=await fetch(`http://localhost:8080/newGroup/${user.id}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(group)
        })
        const res= await response.json();
        if(res.success){ 
           dispatch(getuserGroups(user.id))
        }
    }
}

export const getAllactivities=(id)=>{
    console.log("activity called")
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getAllactivities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            dispatch(setAllactivities(res.activitiesList));
        }
    };
}

export const { setGroups,setAllgroups,setGroupMembers,setAllactivities } = groupslice.actions;
export default groupslice.reducer;
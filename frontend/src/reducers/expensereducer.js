import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    expenses:[],
    owedList:[],
    owedyou:[],
};
const expenseslice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
       setExpenses:(state, action) => {
        state.expenses = action.payload;
    },
    setOwedList:(state,action)=>{
        state.owedList=action.payload
    },
    setOwedyou:(state,action)=>{
        state.owedyou=action.payload
    },
    },
});

export const getExpenses=(id)=>{
    console.log("getexp called",id);
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getexpenses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            console.log(res.expensesList);
            dispatch(setExpenses(res.expensesList));
        }
    };
}

export const addExpense=(expense)=>{
    const user=JSON.parse(localStorage.getItem('user'))
    return async (dispatch)=>{
        const response=await fetch(`http://localhost:8080/newExpense/${user.id}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(expense)
        })
        const res= await response.json();
        if(res.success){
            dispatch(getExpenses(user.id))
        }
    }
}

export const getYouowed=(id)=>{
    
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getYouowed/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
          
            dispatch(setOwedList(res. youowedlist));
        }
    };
}

export const getOwedyou=(id)=>{
    
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/getOwedyou/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res= await response.json();
        if(res.success){
            
            dispatch(setOwedyou(res. owedlist));
        }
    };
}

export const settleUp=(details)=>{
    const user =JSON.parse(localStorage.getItem('user'))
    return async (dispatch)=>{
        const response= await fetch(`http://localhost:8080/settleUp/${user.id}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(details)
        })
        const res = await response.json();
        if(res.success){
            dispatch(getYouowed(user.id))
        }
    }
}

export const { setExpenses,setPartExpense,  setOwedList,setOwedyou} = expenseslice.actions;
export default expenseslice.reducer;
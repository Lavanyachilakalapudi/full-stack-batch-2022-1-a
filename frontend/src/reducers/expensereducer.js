import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    expenses:[],
};
const expenseslice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
       setExpenses:(state, action) => {
        state.expenses = action.payload;
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
        const response=await fetch("http://localhost:8080/newExpense",{
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

export const { setExpenses } = expenseslice.actions;
export default expenseslice.reducer;
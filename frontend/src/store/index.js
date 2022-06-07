import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/loginslice'
import FriendReducer from '../reducers/friendslice'
import ExpenseReducer from '../reducers/expensereducer'

export const store = configureStore({
  reducer: {
    users: LoginReducer,
    friend:FriendReducer,
    expense:ExpenseReducer
  },
});

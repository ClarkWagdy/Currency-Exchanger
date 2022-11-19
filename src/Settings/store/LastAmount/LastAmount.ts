import {createSlice} from "@reduxjs/toolkit";


const initialState:string | null = null;
export const LastAmountSlice = createSlice({
    name: "LastAmount", initialState, reducers: {
        setLastAmount(state, action){

            return action.payload;
        }
    }
})
export const setLastAmount = LastAmountSlice.actions.setLastAmount;
export const LastAmountReducer= LastAmountSlice.reducer;
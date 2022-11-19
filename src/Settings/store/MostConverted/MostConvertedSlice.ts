import {createSlice} from "@reduxjs/toolkit";

export interface CurrencyConverted {
    Id :number|null ,
    Amount: string,
    Result: number,
    From: string,
    To: string,
    CreateAt: string,
    Count: number,
}
const initialState: Array<CurrencyConverted> | null = null;
export const MostConvertedSlice = createSlice({
    name: "MostConverted", initialState, reducers: {
        setCurrencyConverted(state, action){

            return action.payload;
        }
    }
})
export const setCurrencyConverted = MostConvertedSlice.actions.setCurrencyConverted;
export const MostConvertedReducer= MostConvertedSlice.reducer;
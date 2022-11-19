import { configureStore } from "@reduxjs/toolkit";
import {MostConvertedReducer} from "./MostConverted/MostConvertedSlice";
import {LastAmountReducer} from "./LastAmount/LastAmount";


export const Store =configureStore({
    reducer:{
         CurrencyConverted:MostConvertedReducer,
        LastAmount:LastAmountReducer,
    },
})
export type RootState = ReturnType<typeof Store.getState>
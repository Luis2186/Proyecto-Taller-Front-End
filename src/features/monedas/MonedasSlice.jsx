import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    monedas:[]
}

export const monedaSlice = createSlice ({

    name:"monedas",
    initialState,
    reducers: {
        guardarMonedas:(state,action) => {
            state.monedas = action.payload;
        }
    }
});

export const {guardarMonedas} = monedaSlice.actions;
export default monedaSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transacciones: []
}

export const tranSlice = createSlice({

    name: "transacciones",
    initialState,
    reducers: {
        guardarTransacciones: (state, action) => {
            state.transacciones = action.payload;
        },
        crearTransaccion: (state, action) => {
            state.transacciones.push(action.payload);
        }
    }


});

export const { guardarTransacciones, crearTransaccion } = tranSlice.actions;
export default tranSlice.reducer;
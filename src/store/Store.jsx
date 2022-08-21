import { configureStore } from "@reduxjs/toolkit";

import transaccionesReducer from '../features/transacciones/TransaccionesSlice'
import monedasReducer from '../features/monedas/MonedasSlice'
import DepartamentosSlice from "../features/departamentos/DepartamentosSlice";
import CiudadesSlice from "../features/ciudades/CiudadesSlice";

export const store = configureStore({

    reducer: {
        transacciones: transaccionesReducer,
        monedas: monedasReducer,
        departamentos: DepartamentosSlice,
        ciudades: CiudadesSlice
    },
})


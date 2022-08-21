import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import * as yup from 'yup'
import { useFormik } from 'formik'
import GraficaLineas from './modelosGraficas/GraficaLineas'
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import './EstilosGraficas.css';


const GraficoTransMoneda = () => {
    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);

    const [mostrar, setMostrar] = useState(false);

    const [data, setData] = useState([]);

    const validationSchema = yup.object({
        idMoneda: yup
            .number('Ingrese una Moneda')
            .required('Seleccione una moneda.'),
    });

    const formik = useFormik({
        initialValues: {
            idMoneda: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { }
    });

    useEffect(() => {

        if (formik.values.idMoneda > 0) {
            setMostrar(true)
            const busquedaTrans = transacciones.filter(trans => trans.moneda === formik.values.idMoneda);
            (busquedaTrans !== undefined) ? guardarDatos(busquedaTrans)
                : setData([]);
        }
        else {
            setMostrar(false);
            setData([]);
        }

    }, [formik.values.idMoneda]);


    const guardarDatos = (arreglo) => {
        const categorias = arreglo.map(bt => (bt.tipo_operacion === 1) ? "Compra" : "Venta");
        const datos = arreglo.map(bt => bt.cantidad * bt.valor_actual);
        setData({ datos: datos, categorias: categorias })
    }
    console.log(data);

    if (transacciones.length != 0) {
    return (
        <>
            <h1 className="mt-4">Transferencias</h1>
            <div className="mt-3">
                <div className="d-flex justify-content-center h-100">
                    <div className="card align-items-center">
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group m-3">
                                    <FormControl className="selector" sx={{ m: 0, minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label"
                                            sx={{
                                                color: "white"
                                            }}
                                        >Monedas</InputLabel>
                                        <Select
                                            sx={{
                                                borderColor: "white",
                                                select: {
                                                    color: "white",
                                                    backgroundColor: "grey"
                                                },
                                                Label: {
                                                    color: "white"
                                                },
                                                "&.MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "white"
                                                    }, "&.Mui-focused fieldset": {
                                                        borderColor: "yellow"
                                                    }
                                                },
                                                "& label.Mui-focused": {
                                                    color: "yellow"
                                                }
                                            }}

                                            labelId="demo-simple-select-standard-label"
                                            id="idMoneda"
                                            name='idMoneda'
                                            /* onClick={capturarIdMoneda} */
                                            onChange={formik.handleChange}
                                            value={formik.values.idMoneda}
                                            label="Moneda"
                                        >
                                            <MenuItem value="">
                                                <em>Seleccione una moneda</em>
                                            </MenuItem>
                                            {monedas.map((m) => (
                                                <MenuItem
                                                    key={m.id}
                                                    value={m.id}
                                                >
                                                    {m.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText error>{formik.touched.idMoneda && formik.errors.idMoneda}</FormHelperText>
                                    </FormControl>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {(mostrar) ?
                (data.datos.length === 0) ? <p className='parrafo fw-bold'> <br />No hay Transacciones para mostrar!</p>
                    : <div className='mt-5'><GraficaLineas {...data} /></div>
                : <p className='parrafo fw-bold'> <br /></p>}
        </>
    )
    }else{
        return(
          
            <p className='parrafo fw-bold'> <br/>No hay Gráficas para mostrar!
            <Link style={{textDecoration:'none', color:"red"}} to="/IngresarTransaccion"> Ingresar Transacción</Link></p>
          
        )
      }
}

export default GraficoTransMoneda
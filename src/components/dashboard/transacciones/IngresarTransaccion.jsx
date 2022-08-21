import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearTransaccion } from '../../../features/transacciones/TransaccionesSlice'
import "./IngresarTransaccion.css"
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { ApiTransaccion } from "../../../services/ServiciosApi";
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { guardarMonedas } from "../../../features/monedas/MonedasSlice";
import { apiMonedas } from "../../../services/ServiciosApi";
import TablaMoneda from '../tablaMonedas/TablaMoneda'
import { useNavigate } from 'react-router-dom'

const IngresarTransaccion = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const monedas = useSelector(state => state.monedas.monedas)

    useEffect(() => {
        const interval = setInterval(() => {
            cargarMonedas();
            mostrarValor();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const cargarMonedas = async () => {
        try {
            const mon = await apiMonedas();
            dispatch(guardarMonedas(mon.monedas));
        } catch (error) {
            alert(error);
        }
    }

    const mostrarValor = () => {
        const mon = monedas.find(m => m.id === formik.values.moneda);
        return mon != null ? mon.cotizacion : 0;
    }

    const validationSchema = yup.object({
        tipoOperacion: yup
            .number()
            .required('Seleccione la transaccion por favor.'),
        moneda: yup
            .number()
            .required('Seleccione la moneda por favor.'),
        cantidad: yup
            .number()
            .required('La cantidad no puede ser 0.')
            .min(1, "Debe ser mayor a 0"),
        valorActual: yup
            .number()
            .required('El valor no puede ser 0.')
            .min(1, "Debe ser mayor a 0"),
    });

    const formik = useFormik({
        initialValues: {
            tipoOperacion: "",
            moneda: "",
            cantidad: "",
            valorActual: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => AgregarTransaccion(values)
    });

    useEffect(() => {
        formik.values.valorActual = formik.values.moneda > 0 ? mostrarValor() : 0;
    }, [formik.values.moneda]);

    const AgregarTransaccion = async (transaccion) => {

        try {
            const respuesta = await ApiTransaccion(transaccion);
            transaccion.id = respuesta.idTransaccion
            transaccion.valor_actual = transaccion.valorActual;
            delete transaccion.valorActual
            transaccion.tipo_operacion = transaccion.tipoOperacion;
            delete transaccion.tipoOperacion
            navigate("/")
            dispatch(crearTransaccion(transaccion))

        } catch (error) {
            alert(error);
        }
    }

    if (monedas.length !== 0) {
        return (


            <div className="d-flex justify-content-center h-100">

                <div className="card align-items-center">

                    <div className="card-header">
                        <h1 className=''> Transacciones </h1>
                    </div>

                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group m-3">

                                <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label"
                                        sx={{
                                            color: "white",
                                        }}
                                    >Transacción</InputLabel>

                                    <Select
                                        sx={{
                                            color: "white",
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
                                        id="tipoOperacion"
                                        name='tipoOperacion'
                                        value={formik.values.tipoOperacion}
                                        onChange={formik.handleChange}
                                        error={formik.touched.tipoOperacion && Boolean(formik.errors.tipoOperacion)}
                                    >
                                        <MenuItem value=""> Seleccione tipo de compra... </MenuItem>
                                        <MenuItem key={1} value={1}> Compra </MenuItem>
                                        <MenuItem key={2} value={2}> Venta </MenuItem>

                                    </Select>
                                    <FormHelperText error>{formik.touched.tipoOperacion && formik.errors.tipoOperacion}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="form-group m-3">
                                <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label"
                                        sx={{
                                            color: "white"
                                        }}
                                    >Moneda</InputLabel>
                                    <Select
                                        sx={{
                                            color: "white",
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
                                        id="moneda"
                                        name='moneda'
                                        onChange={formik.handleChange}
                                        value={formik.values.moneda}
                                        error={formik.touched.moneda && Boolean(formik.errors.moneda)}
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
                                    <FormHelperText error>{formik.touched.moneda && formik.errors.moneda}</FormHelperText>
                                </FormControl>

                            </div>

                            <div className="form-group m-3">
                                <TextField
                                    sx={{
                                        input: {
                                            color: "white",
                                            backgroundColor: "grey"
                                        },
                                        Label: {
                                            color: "white"
                                        },
                                        "& .MuiOutlinedInput-root": {
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
                                    id="cantidad"
                                    type="number"
                                    name="cantidad"
                                    label="Cantidad"
                                    value={formik.values.cantidad}
                                    onChange={formik.handleChange}
                                    error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                                    helperText={formik.touched.cantidad && formik.errors.cantidad}
                                />
                            </div>

                            <div className="form-group m-3">
                                <InputLabel id="demo-simple-select-standard-label"
                                    sx={{
                                        color: "white",
                                        fontSize: 12
                                    }}
                                >Cotizacion Actual</InputLabel>

                                <TextField
                                    fullWidth
                                    sx={{
                                        input: {
                                            color: "white",
                                            backgroundColor: "grey"
                                        },
                                        Label: {
                                            color: "white"
                                        },
                                        "& .MuiOutlinedInput-root": {
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
                                    id="valorActual"
                                    type="number"
                                    name="valorActual"
                                    value={mostrarValor()}
                                    error={formik.touched.valorActual && Boolean(formik.errors.valorActual)}
                                    helperText={formik.touched.valorActual && formik.errors.valorActual}
                                />
                            </div>

                            <div className="form-group my-3">
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-block m-3"
                                >
                                    Ingresar Transacción{" "}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <TablaMoneda />
            </div>

        )
    } else {
        return <div> No hay conexion</div>
    }
}

export default IngresarTransaccion
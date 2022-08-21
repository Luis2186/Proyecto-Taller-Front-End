import React, { useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { apiRegistro } from '../../services/ServiciosApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Registro = () => {

    const navigate = useNavigate();    

    const mostrarDepartamentos = useSelector((state) => state.departamentos.departamentos);
    const guardarCiudadesMos = useSelector(state => state.ciudades.ciudades);    
    const [mostrarCiudades, setMostrarCiudades] = useState([]);

    const validationSchema = yup.object({
        usuario: yup
            .string('Ingrese su usuario')
            .required('El usuario no puede estar vacío.'),
        password: yup
            .string('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
        idDepartamento: yup
            .string('Ingrese un Departamento')
            .required('Seleccione un Departamento ....'),
        idCiudad: yup
            .string('Ingrese una Ciudad')
            .required('Seleccione una Ciudad ....'),
    });

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: '',
            idDepartamento: '',
            idCiudad: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => registro(values)
    });

    const registro = async (usuario) => {
        try {
            console.log(usuario);
            const respuesta = await apiRegistro(usuario);

            if (respuesta != undefined) {
                alert("Usuario registrado correctamente.")
                navigate("/Login");
            }

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {        
        const buscarCity = guardarCiudadesMos.filter(ciudades => ciudades.id_departamento ==formik.values.idDepartamento );
        setMostrarCiudades(buscarCity);
    }, [formik.values.idDepartamento])

    return (        
         
        <Container className='align-content-center container'>
            <Form className='formulario' onSubmit={formik.handleSubmit} >
                <h2 className='formulario-titulo py-2'>Registro</h2>
                <Row className="justify-content-center py-1 mb-3">
                    <TextField
                        fullWidth
                        className="w-50"
                        sx={{
                            input: {
                                color: "white",
                                backgroundColor: "grey",
                            },
                            label: {
                                color: "white",
                                borderColor: "white",
                            },
                            fieldset: {
                                color: "white"
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "yellow"
                                }
                            },
                            "& label.Mui-focused": {
                                color: "yellow"
                            }
                        }}
                        id="usuario"
                        name="usuario"
                        label="Usuario"
                        value={formik.values.usuario}
                        onChange={formik.handleChange}
                        error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                        helperText={formik.touched.usuario && formik.errors.usuario}
                    />
                </Row>
                <Row className="justify-content-center mb-3">
                    <TextField
                        fullWidth
                        className="w-50"
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
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Row>                
                <div className="form-group m-3">
                <FormControl sx={{  m:0,
                                    minWidth: '58%' ,
                                 }}>
                                            <InputLabel id="demo-simple-select-standard-label"
                                            sx={{
                                                color: "white"
                                            }}
                                            >
                                                Departamentos
                                            </InputLabel>
                                            
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
                                                id="idDepartamento"
                                                name='idDepartamento'
                                                value={formik.values.idDepartamento}
                                                onChange={formik.handleChange}
                                                label="Departamentos"                           
                                            >
                                                <MenuItem value="">
                                                    <em>Seleccione un Departamento</em>
                                                </MenuItem>
                                                {mostrarDepartamentos.map((dep) => (
                                                    <MenuItem
                                                        key={dep.id}
                                                        value={dep.id}
                                                    >
                                                        {dep.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText error>{formik.touched.idDepartamento && formik.errors.idDepartamento}</FormHelperText>
                    </FormControl>  
                </div>
                {formik.values.idDepartamento != "" && <div className="form-group m-3">
                <FormControl sx={{  m:0,
                                    minWidth: '58%' ,
                                 }}>
                                            <InputLabel id="demo-simple-select-standard-label"
                                            sx={{
                                                color: "white"
                                            }}
                                            >
                                                Ciudades
                                            </InputLabel>
                                            
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
                                                id="idCiudad"
                                                name='idCiudad'
                                                value={formik.values.idCiudad}
                                                onChange={formik.handleChange}
                                                label="Ciudades"                           
                                            >
                                                <MenuItem value="">
                                                    <em>Seleccione una Ciudad</em>
                                                </MenuItem>
                                                {mostrarCiudades.map((city) => (
                                                    <MenuItem
                                                        key={city.id}
                                                        value={city.id}
                                                    >
                                                        {city.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText error>{formik.touched.idCiudad && formik.errors.idCiudad}</FormHelperText>
                    </FormControl>  
                </div>}
                <Row className="justify-content-center mb-3">

                    <button                        
                        type="submit"
                        className="btn btn-dark btn-block px-1 mx-0 w-25"
                    >
                        Registrarse{" "}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark btn-block mx-2 w-25"
                        onClick={() => navigate("/Login")}
                    >
                        Ingresar{" "}
                    </button>
                </Row>
            </Form>
        </Container>
    )
}

export default Registro

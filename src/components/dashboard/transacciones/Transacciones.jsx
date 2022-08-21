import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import MontoFinal from '../montoTotal/MontoFinal';
import { Link } from 'react-router-dom';


const Transacciones = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);

    const monedas = useSelector(state => state.monedas.monedas)

    const traerMoneda = (id) => {
        const mon = monedas.find(m => m.id === id);
        return mon.nombre;
    }

    if (transacciones.length != 0) {
        return (
            <div className='px-2'>
                <h2 className='mt-2'>Transacciones</h2>
                <MontoFinal />
                <Table striped variant="light">
                    <thead>
                        <tr>
                            <th>N° Transacción</th>
                            <th>Moneda</th>
                            <th>Tipo de Operación</th>
                            <th>Cantidad</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacciones.map((tran, index) => {
                            return (
                                <tr key={index}>
                                    <td>{tran.id}</td>
                                    <td>{traerMoneda(tran.moneda)}</td>
                                    <td>{(tran.tipo_operacion === 1) ? "Compra" : "Venta"}</td>
                                    <td>{tran.cantidad}</td>
                                    <td>$ {tran.valor_actual}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </div>
        )
    } else {
        return(
            <p className='parrafo fw-bold'> <br/>No hay Transacciones para mostrar!. 
            <Link style={{textDecoration:'none', color:"red"}} to="/IngresarTransaccion"> Ingresar Transacción</Link></p>
        )
    }
}

export default Transacciones
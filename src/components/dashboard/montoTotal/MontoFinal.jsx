import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table'

const MontoFinal = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);

    const [vSumTotal, setVSumTotal] = useState(0);
    const [compras, setCompras] = useState(0);
    const [ventas, setVentas] = useState(0);

    useEffect(() => {
        const handlesumar = () => {
            const sumarTotal = transacciones.map
                ((monto) => parseFloat(
                    (monto.tipo_operacion === 1) ? (monto.cantidad * monto.valor_actual)
                        : (-1 * monto.cantidad * monto.valor_actual)))
                .reduce((previous, current) => {
                    return previous + current;
                }, 0);
            setVSumTotal(sumarTotal);

            const sumarTotalCompras = transacciones.map
                ((monto) => parseFloat(
                    (monto.tipo_operacion === 1) ? (monto.cantidad * monto.valor_actual)
                        : 0))
                .reduce((previous, current) => {
                    return previous + current;
                }, 0);
            setCompras(sumarTotalCompras);

            const sumarTotalVentas = transacciones.map
                ((monto) => parseFloat(
                    (monto.tipo_operacion === 2) ? (monto.cantidad * monto.valor_actual)
                        : 0))
                .reduce((previous, current) => {
                    return previous + current;
                }, 0);
            setVentas(sumarTotalVentas);

        };
        handlesumar();

    });

    return (
        <div>
            <Table striped variant="light">
                <thead>
                    <tr>
                        <th colSpan="3">Montos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Balance Final: <span className='fw-bold'> $ {vSumTotal} </span></td>
                        <td>Gastos en Compras: <span className='fw-bold'> $ {compras} </span></td>
                        <td>Ingresos en Ventas: <span className='fw-bold'> $ {ventas}</span></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default MontoFinal
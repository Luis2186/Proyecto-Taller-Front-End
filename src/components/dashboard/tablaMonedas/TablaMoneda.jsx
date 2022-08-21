import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';

const TablaMoneda = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);

    const filtarTrans = (id, cot, nombre) => {
        const filtro = transacciones.findLast(t => t.moneda == id);

        const ultimaMoneda = {
            id: id,
            cotizacionActual: cot,
            nombre: nombre,
            cotizacionAnterior: (filtro == undefined) ? "-" : filtro.valor_actual,
            IA: (filtro == undefined) ? "Sin acciones" : (cot > filtro.valor_actual) ? "Vender" : "Comprar"
        }
        return ultimaMoneda;
    }
    const datos = monedas.map((idM) => (filtarTrans(idM.id, idM.cotizacion, idM.nombre)))

    if (monedas.length !== 0) {
        return (

            <div className='px-2 m-5'>

                <div className="card align-items-center w-100">

                    <div className="card-header w-100">
                        <h1 className=''>Monedas</h1>
                    </div>
                    <div className="card-body w-100">
                        <Table striped variant="dark">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cotización Actual</th>
                                    <th>Cotización Anterior</th>
                                    <th>Recomendación</th>
                                </tr>
                            </thead>

                            <tbody>
                                {datos.map((dato, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{dato.nombre}</td>
                                            <td>{dato.cotizacionActual}</td>
                                            <td>{dato.cotizacionAnterior}</td>
                                            <td>{dato.IA}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    } else {
        <div> No hay conexion</div>
    }
}

export default TablaMoneda
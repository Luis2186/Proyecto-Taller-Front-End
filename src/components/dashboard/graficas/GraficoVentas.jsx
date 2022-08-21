import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import GraficaBarras from './modelosGraficas/GraficaBarras';
import { Link } from 'react-router-dom';


const GraficoVentas = () => {
    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);
    const auxMonedas = monedas.map(m => m.id);

    const filtarTransacciones = (id) => {

        const filtro = transacciones.filter(trans => trans.moneda === id && trans.tipo_operacion === 2);
        const valorGrafica = filtro.map((monto) => parseFloat(
            (monto.length > 0) ? 0
                : (monto.cantidad * monto.valor_actual)))
            .reduce((previous, current) => {
                return previous + current;
            }, 0);

        return valorGrafica;
    }

    const datos = auxMonedas.map((idM) => (filtarTransacciones(idM)))

    const categorias = monedas.map(m => m.nombre);

    const [data, setData] = useState({ datos: datos, categorias: categorias })

  if (transacciones.length != 0) {
    return (    
      <div>
            <h1 className="mt-5">Monedas Vendidas</h1>
            <GraficaBarras {...data} />
        </div>  

    )
  }else{
    return(
      
        <p className='parrafo fw-bold'> <br/>No hay Gráficas para mostrar!
        <Link style={{textDecoration:'none', color:"red"}} to="/IngresarTransaccion"> Ingresar Transacción</Link></p>
    )
  }
}

export default GraficoVentas
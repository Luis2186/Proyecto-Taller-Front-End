import React from "react";

const Titulo = ({ text }) => {  // Destrocturacion de objetos, pasado como parametro
    return (
        <div className="">
            <h3> {text} </h3>
        </div>
    )
}

export default Titulo;
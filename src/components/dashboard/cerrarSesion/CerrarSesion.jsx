import React from 'react'
import { Navigate,useNavigate} from 'react-router-dom';

const CerrarSesion = () => {

    const navigate = useNavigate();
    sessionStorage.clear();
    localStorage.clear();
    
    return (
        <Navigate replace to={"/Login"}>
       
        </Navigate>
    )
  
}

export default CerrarSesion
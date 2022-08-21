import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
       
    if (dataLog == null) {
        return <Navigate replace to={"/Login"}></Navigate>;
    } else {
        return (
            <div>
                <Navbar className='navBg' bg="light" expand="lg">
                    <Container>
                        {/* <Navbar.Brand href="/">Obligatorio React</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Transacciones</Nav.Link>
                                <Nav.Link as={Link} to="/IngresarTransaccion">Ingresar Transacción</Nav.Link>
                                <NavDropdown title="Gráficas" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="/Graficas/GraficaCompras">Compras por Monedas</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Graficas/GraficaVentas">Ventas por Monedas</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/Graficas/GraficaTransaccionesMoneda">Transferencias por Moneda</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/CerrarSesion">Cerrar Sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <section>
                    <Outlet />
                </section>

            </div>
        )
    }

}

export default Dashboard
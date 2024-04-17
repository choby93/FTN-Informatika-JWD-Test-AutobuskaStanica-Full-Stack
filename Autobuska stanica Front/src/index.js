import React from "react";
import { createRoot } from 'react-dom/client';
import { Route, Link, HashRouter as Router, Routes } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "./services/auth";
import { Navigate } from "react-router-dom/dist";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import AutobuskaStanica from "./components/AutobuskStanica/Linija";
import AddLinija from "./components/AutobuskStanica/AddLinija";
import EditLinija from "./components/AutobuskStanica/EditLinija";


const App = () => {
  if (window.localStorage["jwt"]) {
    return (
      <>
        <Router>
          <Navbar expand bg="dark" variant="dark">

            <Nav>
              <Nav.Link as={Link} to={'/'}>Autobuska Stanica</Nav.Link>
              <Nav.Link as={Link} to={'/redVoznje'}>Red vožnje</Nav.Link>
              <Button onClick={logout}>Logout</Button>
            </Nav>
          </Navbar>
          <Container style={{ paddingTop: "25px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/redVoznje" element={<AutobuskaStanica />} />
              <Route path="/dodajLiniju" element={<AddLinija />} />
              <Route path="/redVoznje/edit/:id" element={<EditLinija />} />
            </Routes>
          </Container>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Navbar expand bg="dark" variant="dark">

            <Nav>
              <Nav.Link as={Link} to={'/'}>Autobuska Stanica</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar>
          <Container style={{ paddingTop: "25px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </Container>
        </Router>
      </>
    );
  }
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <App />,
);

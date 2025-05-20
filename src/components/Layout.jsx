import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Usaremos Bootstrap para los componentes

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Cambiaremos los valores de color a clases de Bootstrap
  const handleBack = () => {
    if (location.pathname.includes('/post/')) {
      navigate(-1);
    } else if (location.pathname.includes('/course/')) {
      navigate('/');
    }
  };

  return (
    <div className="min-vh-100 bg-light text-dark">
      {/* Header */}
      <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Mi Blog</Navbar.Brand>
          <Nav className="me-auto">
            {location.pathname !== '/' && (
              <Button
                variant="outline-secondary"
                onClick={handleBack}
                className="me-3"
              >
                <ArrowLeft size={20} /> Volver
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container as="main" className="pt-5">
        {children}
      </Container>
    </div>
  );
};

export default Layout;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComments } from '../hooks/useComments';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const CourseList = () => {
  const { cursos, handleGetCursos, handleGetCursoPorNombre } = useComments();
  const [busqueda, setBusqueda] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCursos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!busqueda.trim()) {
      setResultadosFiltrados(cursos || []);
    } else {
      const filtrados = cursos?.filter((curso) =>
        curso.name.toLowerCase().includes(busqueda.toLowerCase())
      );
      setResultadosFiltrados(filtrados || []);
    }
  }, [busqueda, cursos]);

  const handleCursoClick = async (nombreCurso) => {
    const nombre = nombreCurso.toLowerCase();
    await handleGetCursoPorNombre(nombre); // consulta y setCurso internamente
    navigate(`/course/${nombre}`);
  };

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <h2 className="mb-4 text-center">Cursos</h2>

      <Row className="justify-content-center mb-4">
        <Col xs={10} md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar curso..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        {Array.isArray(resultadosFiltrados) && resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((curso) => (
            <Col
              key={curso._id}
              xs={12}
              sm={8}
              md={6}
              lg={4}
              className="mb-4 d-flex align-items-stretch"
              onClick={() => handleCursoClick(curso.name)}
            >
              <Card className="text-center shadow-sm w-100 card-hover">
                <Card.Body>
                  <Card.Title>{curso.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p className="text-muted">No hay cursos disponibles.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CourseList;

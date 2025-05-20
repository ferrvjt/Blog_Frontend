import { useComments } from '../hooks/useComments';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const OpinionList = ({ comentarios, postId, setEditing, setComentarios }) => {
  const { handleDeleteComentario, handleGetCommentsByPost } = useComments();

  const handleDelete = async (commentId) => {
    await handleDeleteComentario(postId, commentId);
    setComentarios(prev => prev.filter(c => c._id !== commentId));
  };
  

  return (
    <Container className="bg-light text-dark p-4 rounded">
      <h4 className="mb-4">Opiniones</h4>
      {Array.isArray(comentarios) && comentarios.length > 0 ? (
        comentarios.map((op) => (
          <Card key={op._id} className="mb-3 bg-white text-dark">
            <Card.Body>
              <Card.Text>
              <strong>{op.user || op.autor || 'Anónimo'}:</strong> <br/>
              {op.bodyComment || op.texto}
              </Card.Text>
              <Row>
                <Col xs="auto">
                  <Button size="sm" variant="warning" onClick={() => setEditing(op)}>
                    Editar
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button size="sm" variant="danger" onClick={() => handleDelete(op._id)}>
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">No hay opiniones todavía.</p>
      )}
    </Container>
  );
};

export default OpinionList;

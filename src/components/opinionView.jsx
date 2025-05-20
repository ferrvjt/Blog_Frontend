import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useComentarios } from '../hooks/useComentarios'; // Asegúrate de tener el nombre correcto del archivo

const OpinionView = () => {
  const {
    posts,
    handleGetPosts,
    handlePostComentario,
    handlePutComentario,
    handleDeleteComentario
  } = useComentarios();

  useEffect(() => {
    handleGetPosts();
  }, []);

  const enviarComentario = async () => {
    await handlePostComentario('post_id', { texto: 'Mi opinión' });
  };

  return (
    <Container className="pt-5 bg-light text-dark">
      <h2 className="mb-4">Comentarios</h2>
      {posts.map(p => (
        <Card key={p._id} className="mb-3 bg-white text-dark">
          <Card.Body>
            <h4>{p.titulo}</h4>
            <Card.Text>{p.body}</Card.Text>
            {/* Aquí podrías agregar más detalles del post si lo deseas */}
          </Card.Body>
        </Card>
      ))}
      <Button onClick={enviarComentario} variant="primary">
        Agregar comentario
      </Button>
    </Container>
  );
};

export default OpinionView;

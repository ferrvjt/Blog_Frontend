import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { useComments } from '../hooks/useComments';

const PostList = () => {
  const { name } = useParams();
  const { curso, posts, handleGetCursoPorNombre, handleGetPostsPorCurso } = useComments();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCursoPorNombre(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);

  useEffect(() => {
    if (curso?._id) {
      handleGetPostsPorCurso(curso._id);
    }
  }, [curso?._id]);

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <div className="d-flex justify-content-center mb-4 align-items-center">
        <h2 className="m-0">Publicaciones de {curso?.name || '...'}</h2>
      </div>

      <Row className="justify-content-center">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <Col key={post._id} xs={12} sm={12} md={6} lg={4} className="mb-4 d-flex align-items-stretch">
              <Card className="w-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{post.hdr}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Por: {post.user}
                  </Card.Subtitle>
                  <Card.Text>{post.body}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    Leer más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p className="text-muted">No hay publicaciones disponibles.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PostList;

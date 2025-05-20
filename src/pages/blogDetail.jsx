import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';
import OpinionForm from '../components/opinionForm';
import OpinionList from '../components/opinionList';
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap';

const BlogDetail = () => {
  const { id } = useParams();
  const {
    post,
    comentarios,
    setComentarios,
    handleGetPostById,
    handleGetCommentsByPost
  } = useComments();

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (id) {
      handleGetPostById(id);
      handleGetCommentsByPost(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  return (
    <Container fluid className="min-vh-100 bg-light py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {post ? (
            <>
              <OpinionForm
                post={post}
                postId={id}
                comentarios={comentarios}
                setComentarios={setComentarios}
                onSaved={() => handleGetCommentsByPost(id)}
                editing={editing}
                setEditing={setEditing}
              />
              <OpinionList
                comentarios={comentarios}
                setComentarios={setComentarios}
                postId={id}
                setEditing={setEditing}
              />
            </>
          ) : (
            <div className="text-center py-5">
              <Spinner animation="border" variant="secondary" role="status" />
              <p className="mt-3 text-muted">Cargando publicación...</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;

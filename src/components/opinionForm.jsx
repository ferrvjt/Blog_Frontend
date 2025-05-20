import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';
import { Button, Card, Form, Container } from 'react-bootstrap';

const OpinionForm = ({
  post,
  postId,
  onSaved,
  editing,
  setEditing,
  setComentarios
}) => {
  const { handlePostComentario, handlePutComentario, handleGetCommentsByPost } = useComments();

  const [user, setUser] = useState('');
  const [bodyComment, setBodyComment] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    if (editing) {
      setBodyComment(editing.bodyComment || '');
      setUser(editing.user || '');
      setMostrarFormulario(true);
    } else {
      setBodyComment('');
      setUser('');
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bodyComment.trim()) return;

    const comentario = {
      user: user.trim() || 'Anónimo',
      bodyComment: bodyComment.trim(),
    };

    if (editing) {
      await handlePutComentario(postId, editing._id, comentario);
      setEditing(null);
    } else {
      console.log(comentario);
      await handlePostComentario(postId, comentario);
    }

    setBodyComment('');
    setUser('');
    setMostrarFormulario(false);

    const updated = await handleGetCommentsByPost(postId);
    setComentarios(updated);
    onSaved();
  };

  return (
    <Container className="mb-5">
      <Card className="mb-4 bg-white text-dark">
        <Card.Body>
          <Card.Title>{post?.hdr}</Card.Title>
          <Card.Text>{post?.body}</Card.Text>
        </Card.Body>
      </Card>

      {!mostrarFormulario && !editing && (
        <Button onClick={() => setMostrarFormulario(true)} variant="primary" className="w-100">
          Agregar opinión
        </Button>
      )}

      {(mostrarFormulario || editing) && (
        <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          {editing && (
            <Form.Label className="text-muted">
              Autor anterior: <strong>{editing.user}</strong>
            </Form.Label>
          )}
          <Form.Control
            type="text"
            placeholder="Autor (opcional)"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
      
        <Form.Group className="mb-3">
          {editing && (
            <Form.Label className="text-muted">
              Comentario anterior:
              <blockquote className="mb-0 mt-1">{editing.bodyComment}</blockquote>
            </Form.Label>
          )}
          <Form.Control
            as="textarea"
            placeholder="Escribe tu opinión..."
            value={bodyComment}
            onChange={(e) => setBodyComment(e.target.value)}
            rows={4}
          />
        </Form.Group>
      
        <Button type="submit" variant="success" className="w-100">
          {editing ? 'Actualizar' : 'Enviar'}
        </Button>
      </Form>
      
      )}
    </Container>
  );
};

export default OpinionForm;

// src/components/OpinionList.jsx
import { useEffect } from 'react';
import { useComments } from '../hooks/useComments';

const OpinionList = ({ postId, setEditing }) => {
  const {
    comentarios,
    handleGetCommentsByPost,
    handleDeleteComentario,
  } = useComments();

  useEffect(() => {
    if (postId) {
      handleGetCommentsByPost(postId);
    }
  }, [postId]);

  const handleDelete = async (commentId) => {
    await handleDeleteComentario(postId, commentId);
    await handleGetCommentsByPost(postId); // Refrescar después de eliminar
  };

  return (
    <div>
      <h3>Opiniones</h3>
      {Array.isArray(comentarios) && comentarios.length > 0 ? (
        <ul>
          {comentarios.map((op) => (
            <li key={op._id} style={{ marginBottom: '1rem' }}>
              <strong>{op.autor || 'Anónimo'}:</strong> {op.texto}
              <div>
                <button onClick={() => setEditing(op)}>Editar</button>
                <button onClick={() => handleDelete(op._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay opiniones todavía.</p>
      )}
    </div>
  );
};

export default OpinionList;

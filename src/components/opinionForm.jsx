import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';

const OpinionForm = ({ post, postId, onSaved, editing, setEditing }) => {
  const { handlePostComentario, handlePutComentario } = useComments();

  const [autor, setAutor] = useState('');
  const [texto, setTexto] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    if (editing) {
      setTexto(editing.bodyComment || '');
      setAutor(editing.user || '');
      setMostrarFormulario(true);
    } else {
      setTexto('');
      setAutor('');
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    const comentario = {
      user: autor.trim() || 'Anónimo',
      bodyComment: texto.trim(),
    };

    if (editing) {
      await handlePutComentario(postId, editing._id, comentario);
      setEditing(null);
    } else {
      await handlePostComentario(postId, comentario);
    }

    setTexto('');
    setAutor('');
    setMostrarFormulario(false);
    onSaved();
  };

  return (
    <div>
      {/* Mostrar publicación arriba */}
      <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h3>{post?.hdr}</h3>
        <p>{post?.body}</p>
      </div>

      {/* Botón para mostrar el formulario si no está editando */}
      {!mostrarFormulario && !editing && (
        <button onClick={() => setMostrarFormulario(true)}>Agregar opinión</button>
      )}

      {/* Formulario */}
      {(mostrarFormulario || editing) && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Autor (opcional)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <textarea
            placeholder="Escribe tu opinión..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <button type="submit">
            {editing ? 'Actualizar' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default OpinionForm;

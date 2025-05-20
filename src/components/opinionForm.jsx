import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';

const OpinionForm = ({
  post,
  postId,
  onSaved,
  editing,
  setEditing,
  setComentarios
}) => {
  const { handlePostComentario, handlePutComentario, handleGetCommentsByPost } = useComments();

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

    const updated = await handleGetCommentsByPost(postId);
    setComentarios(updated);
    onSaved();
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      {/* Publicación */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post?.hdr}</h2>
        <p className="text-gray-600">{post?.body}</p>
      </div>

      {/* Botón para mostrar formulario */}
      {!mostrarFormulario && !editing && (
        <button
          onClick={() => setMostrarFormulario(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Agregar opinión
        </button>
      )}

      {/* Formulario */}
      {(mostrarFormulario || editing) && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow mt-4 space-y-4">
          <input
            type="text"
            placeholder="Autor (opcional)"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Escribe tu opinión..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {editing ? 'Actualizar' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default OpinionForm;

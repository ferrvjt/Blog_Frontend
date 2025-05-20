import { useComments } from '../hooks/useComments';

const OpinionList = ({ comentarios, postId, setEditing, setComentarios }) => {
  const { handleDeleteComentario, handleGetCommentsByPost } = useComments();

  const handleDelete = async (commentId) => {
    await handleDeleteComentario(postId, commentId);
    const updated = await handleGetCommentsByPost(postId);
    setComentarios(updated);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Opiniones</h3>
      {Array.isArray(comentarios) && comentarios.length > 0 ? (
        <ul className="space-y-4">
          {comentarios.map((op) => (
            <li
              key={op._id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <p className="text-gray-700 mb-2">
                <span className="font-bold text-gray-800">{op.autor || 'Anónimo'}</span>: {op.texto}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(op)}
                  className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(op._id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay opiniones todavía.</p>
      )}
    </div>
  );
};

export default OpinionList;

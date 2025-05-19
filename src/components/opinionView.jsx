import { useComentarios } from '../hooks/useComentarios';

const ComentariosView = () => {
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
    <div>
      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.titulo}</h3>
        </div>
      ))}
      <button onClick={enviarComentario}>Agregar comentario</button>
    </div>
  );
};

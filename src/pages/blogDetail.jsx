import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';
import OpinionForm from '../components/opinionForm';
import OpinionList from '../components/opinionList';

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
    <div>
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
        <p>Cargando publicación...</p>
      )}
    </div>
  );
};

export default BlogDetail;
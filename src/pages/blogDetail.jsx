import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';
import OpinionForm from '../components/OpinionForm';
import OpinionList from '../components/opinionList';

const BlogDetail = () => {
  const { id } = useParams();
  const { post, handleGetPostById, handleGetCommentsByPost } = useComments();

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (id) {
      handleGetPostById(id);
      handleGetCommentsByPost(id);
    }
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <OpinionForm
            post={post}
            postId={id}
            onSaved={() => handleGetCommentsByPost(id)}
            editing={editing}
            setEditing={setEditing}
          />
          <OpinionList
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

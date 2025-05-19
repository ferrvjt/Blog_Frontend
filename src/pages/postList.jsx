import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComments } from '../hooks/useComments';

const PostList = () => {
  const {  name } = useParams();
  const { curso, posts, handleGetCursoPorNombre, handleGetPostsPorCurso } = useComments();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await handleGetCursoPorNombre(name);
    };
    fetchData();
  }, [name]);

  useEffect(() => {
  if (curso?._id) handleGetPostsPorCurso(curso._id);
}, [curso?._id]);


  return (
    <div>
      <h2>Publicaciones de {curso.name}</h2>
      <ul>
        {Array.isArray(posts) ? posts.map(post => (
          <li key={post._id} onClick={() => navigate(`/post/${post._id}`)}>
            <strong>{post.user}</strong><br />
            <em>{post.hdr}</em><br />
            {post.body}
          </li>
        )) : (
          <li>No hay publicaciones disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default PostList;

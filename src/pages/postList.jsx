const PostList = () => {
  const { name } = useParams();
  const { curso, posts, handleGetCursoPorNombre, handleGetPostsPorCurso } = useComments();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCursoPorNombre(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);

  useEffect(() => {
    if (curso?._id) handleGetPostsPorCurso(curso._id);
  }, [curso?._id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Publicaciones de {curso.name}</h2>
      <ul className="space-y-4">
        {Array.isArray(posts) ? posts.map(post => (
          <li
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Por: {post.user}</p>
            <h3 className="text-lg font-semibold">{post.hdr}</h3>
            <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
          </li>
        )) : (
          <li>No hay publicaciones disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default PostList;

import { useState } from 'react';
import {toast} from 'react-toastify'
import {
  getCourses,
  getCourseByName,
  getPost,
  getPostByCourse,
  postComment,
  putComment,
  deleteComment,
  getPostById,
} from '../services/api';

export const useComments = () => {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(null);

  const handleGetCommentsByPost = async (postId) => {
    try {
      const data = await getPostById(postId); // O el endpoint correcto para obtener comentarios
      setComentarios(data.opinion.comments);
    } catch (e) {
      toast.error("Error al obtener comentarios ❌");
      setError(e.message);
    }
  };


  const handleGetCursos = async () => {
  try {
    const data = await getCourses();
    setCursos(data.category || []); // ✅ extrae correctamente el array
  } catch (e) {
    console.error('Error al obtener cursos:', e.message);
    setCursos([]);
  }
};


  const handleGetCursoPorNombre = async (name) => {
  try {
    const res = await getCourseByName(name); // res = { success: true, course: [ ... ] }
    if (res.course && res.course.length > 0) {
      setCurso(res.course[0]);  // ✅ Guarda el primer curso
    } else {
      setCurso(null);
    }
  } catch (e) {
    console.error('Error al obtener curso por nombre:', e.message);
    setCurso(null);
    setError(e.message);
  }
};


  const handleGetPosts = async () => {
    try {
      const data = await getPost();
      setPosts(data);
    } catch (e) {
      console.error('Error al obtener posts:', e.message);
      setError(e.message);
    }
  };

  const handleGetPostById = async (id) => {
    try {
      const res = await getPostById(id);
      setPost(res.opinion)
    } catch (e) {
      console.error('Error al obtener post', e.message)
      setError(e.message);
    }
  }

  const handleGetPostsPorCurso = async (cursoId) => {
    try {
      const res = await getPostByCourse(cursoId);
      if (Array.isArray(res.posts)) {
        setPosts(res.posts); // ✅ solo si es un array
      } else {
        setPosts([]); // ⚠️ para evitar errores si no devuelve lo esperado
      }
    } catch (e) {
      console.error('Error al obtener posts por curso:', e.message);
      setPosts([]); // ❌ evita errores futuros
      setError(e.message);
    }
  };


  const handlePostComentario = async (postId, data) => {
  try {
    await postComment(postId, data);
    toast.success("Comentario creado correctamente ✅");
  } catch (e) {
    toast.error("Error al crear comentario ❌");
    setError(e.message);
  }
};

const handlePutComentario = async (postId, commentId, comment) => {
  try {
    await putComment(postId, commentId, comment);
    toast.success("Comentario actualizado ✏️");
  } catch (e) {
    toast.error("Error al actualizar comentario ❌");
  }
};

const handleDeleteComentario = async (postId, commentId) => {
  try {
    await deleteComment(postId, commentId);
    toast.success("Comentario eliminado 🗑️");
  } catch (e) {
    toast.error("Error al eliminar comentario ❌");
  }
};

  return {
    cursos,
    curso,
    posts,
    post,
    comentarios,
    error,
    handleGetCursos,
    handleGetCursoPorNombre,
    handleGetPosts,
    handleGetPostsPorCurso,
    handlePostComentario,
    handlePutComentario,
    handleDeleteComentario,
    handleGetCommentsByPost,
    handleGetPostById
  };
};

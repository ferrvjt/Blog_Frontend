import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComments } from '../hooks/useComments';

const CourseList = () => {
  const { cursos, handleGetCursos } = useComments();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCursos();
  }, []);

  return (
    <div>
      <h2>Cursos</h2>
      <ul>
        {Array.isArray(cursos) && cursos.map((curso) => (
          <li key={curso._id} onClick={() => navigate(`/course/${curso.name.toLowerCase()}`)}>
            {curso.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

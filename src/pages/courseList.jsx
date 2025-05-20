import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComments } from '../hooks/useComments';

const CourseList = () => {
  const { cursos, handleGetCursos } = useComments();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCursos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Cursos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.isArray(cursos) && cursos.map((curso) => (
          <div
            key={curso._id}
            onClick={() => navigate(`/course/${curso.name.toLowerCase()}`)}
            className="cursor-pointer p-6 rounded-xl shadow bg-white dark:bg-gray-800 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-center">{curso.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CourseList;

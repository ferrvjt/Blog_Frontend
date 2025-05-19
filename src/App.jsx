import {Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/blogDetail";
import CourseList from "./pages/courseList"; // Página inicial
import PostList from "./pages/postList";     // Lista de publicaciones por curso

function App() {
  return (
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:name" element={<PostList />} />
        <Route path="/post/:id" element={<BlogDetail />} />
      </Routes>
  );
}

export default App;

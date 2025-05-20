import {Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/blogDetail";
import CourseList from "./pages/courseList"; // Página inicial
import PostList from "./pages/postList";     // Lista de publicaciones por curso
import Layout from './components/Layout';
import './index.css'


function App() {
  return (
      <Routes>
        <Route path="/post/:id" element={<Layout><BlogDetail /></Layout>} />
        <Route path="/" element={<Layout><CourseList /></Layout>} />
        <Route path="/course/:name" element={<Layout><PostList /></Layout>} />
      </Routes>
  );
}

export default App;

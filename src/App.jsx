import {Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/blogDetail";
import CourseList from "./pages/courseList"; // Página inicial
import PostList from "./pages/postList";     // Lista de publicaciones por curso
import Layout from './components/Layout';
import './index.css';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/post/:id" element={<BlogDetail />} />
        <Route path="/" element={<CourseList />} />
        <Route path="/course/:name" element={<PostList />} />
      </Routes>
    </Layout>
  );
}

export default App;

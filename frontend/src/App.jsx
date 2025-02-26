import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/auth/register.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import Login from "./pages/auth/Login.jsx";
import Blog from "./pages/posts/Blog.jsx";
import Profile from "./pages/profile.jsx";
import Show from "./pages/posts/Show.jsx";
import Posts from "./pages/posts/Posts.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/:slug" element={<Show />} />
          <Route path="/myposts" element={<Posts />} />
          <Route path="/conversations" element={<Chat />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

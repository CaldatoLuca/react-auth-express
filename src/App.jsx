import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import PostsByTag from "./pages/PostsByTag";
import AccessLayout from "./layouts/AccessLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManagePosts from "./pages/auth/managePosts";
import PrivatePages from "./middlewares/PrivatePages";
import AddPost from "./pages/auth/AddPost";
function App() {
  return (
    <div className="container mx-auto lining-nums">
      <Routes>
        {/* Rotte Pubbliche */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/posts" element={<BaseLayout />}>
          <Route path="details/:slug" element={<Details />} />
          <Route path=":tag" element={<PostsByTag />} />
        </Route>
        <Route path="/access" element={<AccessLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Rotte private protette da middl */}

        <Route
          path="/admin"
          element={
            <PrivatePages>
              <BaseLayout />
            </PrivatePages>
          }
        >
          <Route index element={<ManagePosts />} />
          <Route path="add-post" element={<AddPost />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

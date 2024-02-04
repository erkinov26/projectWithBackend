import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Choose from "./pages/Choose";
import SignUp from "./pages/SignUp";
// import AdminPanel from "./pages/AdminPanel";
import SignInAuthor from "./pages/SignInAuthor";
// import AuthorPanel from "./pages/AuthorPanel";
import MyPosts from "./pages/MyPosts";
import AllPostsByAdmin from "./pages/AllPostsByAdmin";
import SignInAdmin from "./pages/SignInAdmin";
import SignInUser from "./pages/SignInUser";
// import UserPanel from "./pages/UserPanel";
import { lazy } from "react";
const LazyAdminPanel = lazy(() => import("./pages/AdminPanel"));
const LazyAuthorPanel = lazy(() => import("./pages/AuthorPanel"));
const LazyUserPanel = lazy(() => import("./pages/UserPanel"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Choose />} />
        <Route path={`signin/admin`} element={<SignInAdmin />} />
        <Route path="signin/user" element={<SignInUser />} />
        <Route path="signin/author" element={<SignInAuthor />}></Route>
        <Route path={`signup/author`} element={<SignUp />} />
        <Route path="author" element={<LazyAuthorPanel />} />
        <Route path="admin" element={<LazyAdminPanel />} />
        <Route path="user" element={<LazyUserPanel />} />
        <Route path="/author/my-posts" element={<MyPosts />} />
        <Route path="/admin/allPosts" element={<AllPostsByAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

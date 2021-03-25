import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginForm } from "./components/Login";
import { Home } from "./components/Home";
import AltNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import { Posts, SinglePost, CreatePost } from "./components/Posts";
import Profile from "./components/Profile";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/userSlice";
import { fetchComments } from "./store/commentSlice";
import { fetchPosts } from "./store/postSlice";
import { ProtectedRoute } from "./ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers("users"));
    dispatch(fetchComments("comments"));
    dispatch(fetchPosts("posts"));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <AltNavbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          {/* <ProtectedRoute>
            <Switch> */}
          <Route path="/posts/create">
            <CreatePost />
          </Route>
          {/* </Switch>
          </ProtectedRoute> */}
          <Route path="/posts/:postId">
            <SinglePost />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

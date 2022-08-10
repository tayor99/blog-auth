import "./App.css";

import Feeds from "./component/Feeds";
import Header from "./component/Header";
import BlogPost from "./component/BlogPost";
import SignUp from "./component/SignUp";
import Login from "./component/Login";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/blogpost" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;

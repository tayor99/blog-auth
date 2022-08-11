import React, { useState, useEffect } from "react";
import "../styles/feeds.css";
import axios from "axios";
import { BASE_URL } from "../apis/api";
import { AiFillDelete } from "react-icons/ai";

const Feeds = () => {
  let pages = 0;
  const [getPosts, setGetPost] = useState([]);

  const handleDelete = async (id) => {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    console.log(loginDetails.access);
    if (loginDetails) {
      try {
        await axios.delete(`${BASE_URL}${id}`, {
          headers: { Authorization: `Bearer ${loginDetails.access}` },
        });

        getBlogs();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // I kept the get blogs fuction outside the useEffect because i need to use it in other place
  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}?&offset=${pages} `);
      const allPost = data?.results;
      setGetPost((oldPost) => [...oldPost, ...allPost]);
    } catch (e) {
      console.log(e);
    }
    pages += 5;
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (
        window.innerHeight + e.target.documentElement.scrollTop + 1 >=
        e.target.documentElement.scrollHeight
      ) {
        getBlogs();
      }
    };
    getBlogs();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="feeds">
      {getPosts.map((getPost) => {
        return (
          <React.Fragment key={getPost.id}>
            <div className="feeds__header">
              <h2>{getPost?.title}</h2>
              <p>{getPost?.author}</p>
            </div>
            <div className="feeds__content">
              <p>{getPost?.content}</p>
            </div>
            <div className="delete__btn">
              <AiFillDelete onClick={() => handleDelete(getPost?.id)} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Feeds;

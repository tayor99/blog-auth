import axios from "axios";
import { useState, useEffect } from "react";

import "../styles/blogpost.css";
import { BASE_URL } from "../apis/api";

const BlogPost = () => {
  const [details, setDetails] = useState({
    title: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [details]);

  const postDetails = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    if (loginDetails) {
      try {
        await axios.post(
          BASE_URL,
          {
            title: details.title,
            content: details.content,
          },
          {
            headers: { Authorization: `Bearer ${loginDetails.access}` },
          }
        );
        setDetails({
          title: "",
          content: "",
        });
      } catch (e) {
        setErrorMessage("Post failed retry");
      }
    } else {
      setErrorMessage("Please login before you post");
    }
  };

  return (
    <div className="blogpost">
      <p className={errorMessage ? "error__message" : "no__error"}>
        {errorMessage}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={details.title}
          onChange={postDetails}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          rows="10"
          value={details.content}
          onChange={postDetails}
        />
        <div className="blogpost__btn">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BlogPost;

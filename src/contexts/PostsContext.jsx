import React, { useState, useContext, createContext } from "react";
import instance from "../utils/axiosClient";
import { useEffect } from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await instance.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await instance.get(`/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await instance.get(`/tags?page=1&limit=20`);
      setTags(response.data.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategory();
    fetchTags();
  }, []);

  const values = {
    posts,
    categories,
    tags,
    fetchPosts,
  };

  return (
    <PostsContext.Provider value={values}>{children}</PostsContext.Provider>
  );
};

const usePosts = () => {
  return useContext(PostsContext);
};

export { PostsProvider, usePosts };

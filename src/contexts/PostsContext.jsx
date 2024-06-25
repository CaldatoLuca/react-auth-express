import React, { useState, useContext, createContext } from "react";
import instance from "../utils/axiosClient";
import { useEffect } from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchCategory = async () => {
    const response = await instance.get(`/categories`);
    setCategories(response.data.categories);
  };

  const fetchTags = async () => {
    const response = await instance.get(`/tags?page=1&limit=20`);
    setTags(response.data.tags);
  };

  useEffect(() => {
    fetchCategory();
    fetchTags();
  }, []);

  const values = {
    categories,
    tags,
  };

  return (
    <PostsContext.Provider value={values}>{children}</PostsContext.Provider>
  );
};

const usePosts = () => {
  return useContext(PostsContext);
};

export { PostsProvider, usePosts };

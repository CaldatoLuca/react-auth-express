import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostsList";
import instance from "../utils/axiosClient";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await instance.get("/posts");
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-6">
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading ? (
        <p className="w-full text-center">Loading posts...</p>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
};

export default Home;

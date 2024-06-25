import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostsList";
import { usePosts } from "../contexts/PostsContext";

const Home = () => {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-6">
      <SearchBar setSearchQuery={setSearchQuery} />

      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Home;

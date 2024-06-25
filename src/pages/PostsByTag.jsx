import instance from "../utils/axiosClient";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostsList";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineCancel as Delete } from "react-icons/md";

const PostsByTag = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tag } = useParams();

  const fetchPostsByTag = async () => {
    try {
      const response = await instance.get(`/posts/tag/${tag}`);
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsByTag();
  }, [tag]);

  return (
    <div className="col-span-6">
      <SearchBar />
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <span className="bg-orange-500 text-slate-200 p-1 px-2 rounded-md flex items-center gap-2">
          {tag}{" "}
          <Link to={"/"}>
            <Delete />
          </Link>
        </span>
      </div>
      {loading ? (
        <p className="w-full text-center">Loading posts...</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default PostsByTag;

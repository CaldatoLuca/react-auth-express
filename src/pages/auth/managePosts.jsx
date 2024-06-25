import { usePosts } from "../../contexts/PostsContext";
import { useAuth } from "../../contexts/AuthContext";
import ManagePostCard from "../../components/ManagePostCard";
import instance from "../../utils/axiosClient";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ManagePosts = () => {
  const { posts, fetchPosts } = usePosts();
  const { user } = useAuth();
  const userPosts = posts.filter((p) => p.userId === user.id);
  const location = useLocation();
  const { message } = location.state || {};

  const [showMessage, setShowMessage] = useState(!!message);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const deletePost = async (postSlug) => {
    try {
      await instance.delete(`/posts/${postSlug}`);
      fetchPosts();
      setDeleteMessage("Post deleted successfully");
      setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="col-span-6 p-6 flex flex-col items-center relative">
      <h2 className="text-emerald-500 text-3xl font-bold mb-16">Your Posts</h2>
      <div
        className={`${
          showMessage ? "opacity-100" : "opacity-0"
        } text-center bg-sky-500 text-xl rounded-md absolute top-0 right-0 p-2 transition-opacity duration-1000`}
      >
        {message}
      </div>
      <div
        className={`${
          deleteMessage ? "opacity-100" : "opacity-0"
        } text-center bg-red-500 text-xl rounded-md absolute top-0 left-0 p-2 transition-opacity duration-1000`}
      >
        {deleteMessage}
      </div>
      <div className="w-4/5 grid grid-cols-3 gap-4">
        {userPosts.map((u, i) => (
          <ManagePostCard
            title={u.title}
            image={u.image}
            category={u.category.name}
            tags={u.tags}
            slug={u.slug}
            deletePost={deletePost}
            key={`tag-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;

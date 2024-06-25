import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../utils/axiosClient";

const Details = () => {
  const { slug } = useParams();
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const response = await instance.get(`/posts/${slug}`);
      setPost(response.data.post);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="col-span-6 flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="col-span-6 flex justify-center">
      <div className="w-4/5 rounded-lg shadow-2xl bg-slate-700 py-10 px-8 flex flex-col gap-4">
        <div className=" text-center">
          <h2 className="text-3xl text-emerald-500 font-semibold mb-2">
            {post.title}
          </h2>
          <div>
            Made by{" "}
            <span className="text-orange-500 font-semibold text-lg">
              {post.user.name}
            </span>
          </div>
        </div>

        {post.image || post.image === "" ? (
          <figure className="w-full  overflow-hidden flex justify-center items-center mb-4 rounded-md">
            <img
              src={`${baseImgUrl}/posts/${post.image}`}
              alt={`${post.title}-img`}
            />
          </figure>
        ) : null}

        <p className="text-lg">{post.content}</p>

        <div>
          <span className="bg-emerald-500 text-slate-200 p-1 rounded-md">
            {post.category.name}
          </span>
        </div>

        <ul className="flex flex-wrap gap-2">
          {post.tags.map((t, i) => (
            <li key={`tag-${i}`}>
              <span className="bg-orange-500 text-slate-200 p-1 rounded-md">
                {" "}
                #{t.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;

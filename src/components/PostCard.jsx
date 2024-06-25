import { useState } from "react";
import { CiSquareInfo as Info } from "react-icons/ci";
import { Link } from "react-router-dom";

const PostCard = ({
  title,
  content,
  image,
  tags,
  published,
  category,
  userImg,
  slug,
  user,
}) => {
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    console.log(user);
  };

  return (
    <div
      className={`w-3/5 rounded-lg shadow-2xl bg-slate-700 grid grid-cols-6 ${
        published ? "" : "hidden"
      }`}
    >
      {/* Colonna sinistra */}
      <div className="col-span-5 p-4">
        {/* Titolo e contenuto */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-emerald-500 ">{title}</h3>

          <Link to={`/posts/details/${slug}`}>
            <Info className="text-2xl text-orange-400"></Info>
          </Link>
        </div>

        <p className="mb-4">
          {isExpanded ? content : `${content.substring(0, maxLength)}...`}
          {content.length > maxLength && (
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={handleToggle}
            >
              {isExpanded ? " View less" : " View more"}
            </span>
          )}
        </p>

        {/* Immagine */}
        {image || image === "" ? (
          <figure className="w-full h-96 overflow-hidden flex justify-center items-center mb-4 rounded-md">
            <img src={`${baseImgUrl}${image}`} alt={`${title}-img`} />
          </figure>
        ) : (
          ""
        )}

        {/* User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {user.image ? (
              <figure className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </figure>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600 flex  justify-center items-center">
                {user.name[0]}
              </div>
            )}
            <span className="text-slate-200">{user.name}</span>
          </div>

          <div className="bg-emerald-500 text-slate-200 p-1 rounded-md">
            {category}
          </div>
        </div>
      </div>

      {/* Colonna di destra */}
      <div className="col-span-1 py-4 rounded-lg shadow-2xl bg-slate-600 flex justify-center items-center text-center">
        {/* Tags */}
        <ul>
          {tags.map((t, i) => (
            <li key={`tag${i}`} className="text-orange-400">
              #{t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCard;

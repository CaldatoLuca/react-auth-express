import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostsContext";

const PreviewCard = ({ title, content, image, tagsIds }) => {
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { tags } = usePosts();

  const tagsList = tagsIds.map((tagId) => tags.find((tag) => tag.id === tagId));

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full rounded-lg shadow-2xl bg-slate-700 grid grid-cols-6">
      {/* Colonna sinistra */}
      <div className="col-span-5 p-4">
        {/* Titolo e contenuto */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-emerald-500 ">{title}</h3>
        </div>

        <p className="mb-4">
          {isExpanded ? content : `${content.slice(0, 300)}...`}
          {content.length > 100 && (
            <button className="text-emerald-500 ml-2" onClick={toggleContent}>
              {isExpanded ? "View Less" : "View More"}
            </button>
          )}
        </p>

        {/* Immagine */}
        {image && (
          <figure className="w-full h-96 overflow-hidden flex justify-center items-center mb-4 rounded-md">
            <img src={image} alt={`${title}-img`} />
          </figure>
        )}

        {/* User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {user.image ? (
              <figure className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={`${baseImgUrl}/users/${user.image}`}
                  alt={`user-${user.image}-img`}
                  className="w-full h-full object-cover"
                />
              </figure>
            ) : (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-600 flex justify-center items-center">
                {user.name[0]}
              </div>
            )}
            <span className="text-slate-200">{user.name}</span>
          </div>
        </div>
      </div>

      {/* Colonna di destra */}
      <div className="col-span-1 py-4 rounded-lg shadow-2xl bg-slate-600 flex justify-center items-center text-center">
        {/* Tags */}
        <ul>
          {tagsList.map((t, i) => (
            <li key={`tag${i}`} className="text-orange-400">
              #{t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewCard;

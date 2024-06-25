import { MdDeleteForever as Delete } from "react-icons/md";
import { MdOutlineMode as Modify } from "react-icons/md";

const ManagePostCard = ({ title, image, category, tags, slug, deletePost }) => {
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;

  return (
    <div className=" col-span-1 rounded-lg shadow-2xl bg-slate-700 p-4 flex flex-col ">
      <div className="flex bg-slate-800 rounded-lg p-2 mb-4 justify-between items-center">
        <button className=" text-blue-400 text-xl">
          <Modify />
        </button>
        <span className="text-emerald-500 font-semibold">{category}</span>
        <button
          className=" text-red-400 text-xl"
          onClick={() => deletePost(slug)}
        >
          <Delete />
        </button>
      </div>

      <h3 className="text-lg font-bold text-emerald-500 mb-2">{title}</h3>

      <div className="mt-auto rounded-md mb-4">
        {image || image === "" ? (
          <figure className="w-full max-h-56 overflow-hidden flex justify-center items-center rounded-md">
            <img src={`${baseImgUrl}/posts/${image}`} alt={`${title}-img`} />
          </figure>
        ) : (
          "No Image for this Post"
        )}
      </div>

      <div className=" mt-auto">
        {tags.length > 0 ? (
          tags.map((t, i) => (
            <div
              key={`tag-${i}`}
              className={`text-orange-500 ${i > 2 ? "hidden" : ""}`}
            >
              #{t.name}
            </div>
          ))
        ) : (
          <span className="text-orange-500 font-semibold">No Tags</span>
        )}
      </div>
    </div>
  );
};

export default ManagePostCard;

import { useState } from "react";
import { usePosts } from "../../contexts/PostsContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AddPost = () => {
  const { categories, tags, fetchPosts } = usePosts();
  const [err, setErr] = useState(false);
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;
  const { user } = useAuth();
  const navigate = useNavigate();
  const categoryOptions = [
    { value: "", label: "Select Category" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];
  const tagsOptions = [
    ...tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })),
  ];
  const formFields = [
    { type: "text", name: "title", label: "Title" },
    {
      type: "select",
      name: "categoryId",
      label: "Category",
      options: categoryOptions,
    },
    { type: "checkbox", name: "published", label: "Published" },
    {
      type: "multicheckbox",
      name: "tags",
      label: "Tags",
      options: tagsOptions,
    },
    { type: "textarea", name: "content", label: "Content" },
    { type: "file", name: "image", label: "Image" },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    title: "",
    categoryId: "",
    published: false,
    tags: [],
    content: "",
    image: null,
  });

  const addPost = async () => {
    try {
      const response = await instance.post(`/posts`, formValues, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost();
      resetForm();
      navigate("/admin", { state: { message: "Post created successfully" } });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="col-span-6 p-6">
      <h2 className="text-emerald-500 text-3xl font-bold mb-16">
        Create a new Post
      </h2>

      <div className="grid grid-cols-2">
        {/* Form */}
        <div className="cols-span-1 flex">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-2/3">
            {formFields.map((field) => (
              <InputElement
                key={field.name}
                type={field.type}
                name={field.name}
                label={field.label}
                value={formValues[field.name]}
                onChange={handleInputChange}
                options={field.options}
              />
            ))}
            {err ? (
              <div className="text-center bg-red-500 rounded-md px-2 py-1">
                {err}
              </div>
            ) : (
              ""
            )}
            <div>
              <button
                type="submit"
                className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
                onClick={() => fetchPosts()}
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="cols-span-1">
          <div
            className={`w-full rounded-lg shadow-2xl bg-slate-700 grid grid-cols-6`}
          >
            {/* Colonna sinistra */}
            <div className="col-span-5 p-4">
              {/* Titolo e contenuto */}
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-emerald-500 ">
                  {formValues.title}
                </h3>
              </div>

              <p className="mb-4">{formValues.content}</p>

              {/* Immagine */}
              {formValues.image || formValues.image === "" ? (
                <figure className="w-full h-96 overflow-hidden flex justify-center items-center mb-4 rounded-md">
                  <img src={formValues.image} alt={`${formValues.title}-img`} />
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
                        src={`${baseImgUrl}/users/${user.image}`}
                        alt={`user-${user.image}-img`}
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
                  {formValues.categoryId}
                </div>
              </div>
            </div>

            {/* Colonna di destra */}
            <div className="col-span-1 py-4 rounded-lg shadow-2xl bg-slate-600 flex justify-center items-center text-center">
              {/* Tags */}
              <ul>
                {formValues.tags.map((t, i) => (
                  <li key={`tag${i}`} className="text-orange-400">
                    #{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

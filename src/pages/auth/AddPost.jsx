import { useState } from "react";
import { usePosts } from "../../contexts/PostsContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";

const AddPost = () => {
  const { categories, tags } = usePosts();
  const [err, setErr] = useState(false);
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

  const addPost = async (formValues) => {
    try {
      const response = await instance.post(`/posts`, formValues, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost();
      resetForm();
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
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="cols-span-1">preview</div>
      </div>
    </div>
  );
};

export default AddPost;

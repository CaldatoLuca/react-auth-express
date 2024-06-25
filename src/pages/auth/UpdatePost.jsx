import { useEffect, useState } from "react";
import { usePosts } from "../../contexts/PostsContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PreviewCard from "../../components/PreviewCard";

const UpdatePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { categories, tags, fetchPosts } = usePosts();
  const [err, setErr] = useState(false);
  const baseImgUrl = import.meta.env.VITE_SERVER_IMAGE_URL;

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

  const [formValues, handleInputChange, resetForm, setValues] = useForm({
    title: "",
    categoryId: "",
    published: false,
    tags: [],
    content: "",
    image: null,
  });

  const fetchPost = async () => {
    try {
      const response = await instance.get(`/posts/${slug}`);
      const postData = response.data.post;
      setPost(postData);
      setValues({
        title: postData.title,
        categoryId: postData.categoryId,
        published: postData.published,
        tags: postData.tags.map((tag) => tag.id),
        content: postData.content,
        image: postData.image,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const updatePost = async () => {
    try {
      await instance.put(`/posts/${slug}`, formValues, {
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
      await updatePost();
      resetForm();
      navigate("/admin", { state: { message: "Post updated successfully" } });
    } catch (e) {
      setErr(e.message);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-6 p-6">
      <h2 className="text-emerald-500 text-3xl font-bold mb-16">Update Post</h2>

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
            {err && (
              <div className="text-center bg-red-500 rounded-md px-2 py-1">
                {err}
              </div>
            )}
            <div>
              <button
                type="submit"
                className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
                onClick={() => fetchPosts()}
              >
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="cols-span-1">
          <PreviewCard
            title={formValues.title}
            content={formValues.content}
            image={`${baseImgUrl}/posts/${formValues.image}`}
            tagsIds={formValues.tags}
          ></PreviewCard>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;

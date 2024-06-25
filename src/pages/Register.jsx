import InputElement from "../components/InputElement";
import useForm from "../hooks/useForm";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Register = () => {
  const { register } = useAuth();
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  const formFields = [
    { type: "text", name: "name", label: "Name" },
    { type: "file", name: "image", label: "Image" },
    { type: "email", name: "email", label: "Email" },
    { type: "password", name: "password", label: "Password" },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        formValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const user = response.data.user;
      const token = response.data.token;
      register(user, token);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser();

    resetForm();
  };

  return (
    <div className="w-1/2 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div>
          <button
            type="submit"
            className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import InputElement from "../components/InputElement";
import useForm from "../hooks/useForm";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [err, setErr] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formValues);
      resetForm();
    } catch (e) {
      setErr(e.message);
    }
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

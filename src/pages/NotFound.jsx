import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-10 w-full h-screen">
        <div> Page Not Found</div>

        <div>
          Click{" "}
          <Link to={`/`} className=" underline text-emerald-500 font-extrabold">
            here
          </Link>{" "}
          to return to Home Page
        </div>
      </div>
    </>
  );
};

export default NotFound;

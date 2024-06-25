import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AccessLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="h-screen grid grid-cols-2">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <Link to="/">
            {" "}
            <div className="flex items-center cursor-pointer">
              <img
                src="/logo-trasparence.png"
                alt="logo"
                className="w-12 mr-3"
              />
              <h1 className=" text-slate-300 text-3xl font-medium">
                Reactive<span className="text-emerald-500">X</span>
              </h1>
            </div>
          </Link>

          <div className=" text-center">
            {location.pathname === "/access/login" ? (
              <>
                <div>Welcome back, we are happy to see you again</div>
                <div>
                  If you don't have an account please make your first{" "}
                  <Link
                    to={"/access/register"}
                    className="text-emerald-500 underline"
                  >
                    registration
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div>Welcome to ReactiveX</div>
                <div>Fill the Form to complete the registration</div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default AccessLayout;

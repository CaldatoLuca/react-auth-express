import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack as BackArrow } from "react-icons/io";
import { IoMdArrowRoundForward as ForwardArrow } from "react-icons/io";
import { MdOutlineLogin as Login } from "react-icons/md";
import { FaHandMiddleFinger as Logout } from "react-icons/fa";
import { FaFireAlt as Fire } from "react-icons/fa";
import { BiSolidHome as Home } from "react-icons/bi";
import { SiBaremetrics as Register } from "react-icons/si";
import { SiGoogletagmanager as ManagePosts } from "react-icons/si";
import { FaPlus as AddPost } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { usePosts } from "../contexts/PostsContext";

const LeftNav = () => {
  const { logout, isLoggedIn } = useAuth();
  const links = [
    {
      title: "Home",
      icon: <Home />,
      path: "/",
      forLogIn: isLoggedIn,
    },
    {
      title: "Log In",
      icon: <Login />,
      path: "/access/login",
      forLogIn: false,
    },
    {
      title: "Sign Up",
      icon: <Register />,
      path: "/access/register",
      forLogIn: false,
    },
    {
      title: "Manage Posts",
      icon: <ManagePosts />,
      path: "/admin",
      forLogIn: true,
    },
    {
      title: "Add Post",
      icon: <AddPost />,
      path: "/admin/add-post",
      forLogIn: true,
    },
    {
      title: "Log Out",
      icon: <Logout />,
      fun: () => logout(),
      forLogIn: true,
    },
  ];
  const { tags } = usePosts();

  const navigate = useNavigate();
  const backNavigate = () => {
    navigate(-1);
  };
  const forwardNavigate = () => {
    navigate(+1);
  };

  return (
    <div className="col-span-1 rounded-md">
      <div className="fixed">
        <div className="px-4 py-6 flex flex-col gap-4">
          <div className="text-center">
            <button
              onClick={backNavigate}
              className="bg-orange-500 text-slate-200 p-1 rounded-md ms-2"
            >
              <BackArrow />
            </button>

            <button
              onClick={forwardNavigate}
              className="bg-orange-500 text-slate-200 p-1 rounded-md ms-2"
            >
              <ForwardArrow />
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {links
              .filter((l) => l.forLogIn === isLoggedIn)
              .map((l, i) => (
                <li
                  key={`link.${i}`}
                  className="bg-slate-500 hover:bg-opacity-50 hover:text-emerald-500 transition rounded-md cursor-pointer"
                >
                  {l.fun ? (
                    <button
                      onClick={l.fun}
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      {l.icon} {l.title}
                    </button>
                  ) : (
                    <Link
                      to={l.path}
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      {l.icon} {l.title}
                    </Link>
                  )}
                </li>
              ))}
          </ul>

          <>
            {tags.length === 0 ? (
              <div>No Tags Found</div>
            ) : (
              <ul>
                <li className="text-orange-500 font-bold flex items-center gap-2">
                  Trending Tags <Fire />
                </li>

                {tags.map((t, i) => (
                  <Link key={`tag-${i}`} to={`/posts/${t.name}`}>
                    <li className="hover:bg-orange-500 rounded-md hover:bg-opacity-70 cursor-pointer transition">
                      #{t.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

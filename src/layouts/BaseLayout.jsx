import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LeftNav from "../components/LeftNav";

const BaseLayout = () => {
  return (
    <>
      <Header></Header>
      <main className="py-10">
        <div className="grid grid-cols-7">
          <LeftNav></LeftNav>
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};

export default BaseLayout;

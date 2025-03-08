import { Outlet, Link } from "react-router-dom";

const LayoutPlay = () => {
  return (
    <div className="text-[#3F4B6E] text-center">
      <h1 className="text-4xl">Bienvenidos al juego</h1>
     
      <hr />

        <Outlet />
    </div>
  );
};

export default LayoutPlay;
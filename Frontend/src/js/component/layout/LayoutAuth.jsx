import { Outlet, Link } from "react-router-dom";

const LayoutAuth = () => {
  return (

   
    <div className="flex flex-row">
        <div className="basis-1/3  h-screen bg-[#3F4B6E]">
        <div className="auth-layout" style={{ textAlign: "center", padding: "20px" }}>
            <h1>Bienvenidos</h1>           
            <hr />

            <Outlet />

                
            </div>
        </div>
        <div className="basis-2/3 text-[#3F4B6E]">imagen</div>
    </div>

  );
};

export default LayoutAuth;
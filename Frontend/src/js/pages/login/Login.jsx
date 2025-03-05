import React from "react";


const Login = () => {
    return (
<div>
      <div className="d-flex justify-content-center ">
        <div className="container col-4 login p-5 text-center">
          <h1 className="text-center text-white">Iniciar sesion</h1>
          <form>
            <div className="mb-3">
                <p>Email</p>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
              ></label>
              <input
                name="email"
                placeholder="drperez@gmail.com"
                // value={loginData.email}
                // onChange={(event) => handleChange(event)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
                <p>Contraseña</p>
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
              ></label>
              <input
                name="password"
                placeholder="Contraseña"
                // value={loginData.password}
                // onChange={(event) => handleChange(event)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="text-white submit">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
};


export default Login;
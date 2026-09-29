import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("http://localhost:8000/api/login", formData)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };
  return (
    <div
      className="flex justify-center items-center h-screen"
      //   style={{ height: "100vh" }}
    >
      <div className=" p-4 flex flex-col justify-center bg-slate-100 shadow-xl w-[35%] rounded-md">
        <h1 className="text-center mb-3">Login</h1>
        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-3 justify-center"
        >
          <div className="mb-3 flex flex-col gap-1">
            <label>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
            />
            {validation.email && (
              <small className="text-red-600">{validation.email[0]}</small>
            )}
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
            {validation.password && (
              <small className="text-red-600">{validation.password[0]}</small>
            )}
          </div>
          <div className="flex flex-col items-end  gap-0">
            <p className="m-0">dont have an account yet, click below!</p>
            <a href="/Register" className=" m-0 p-0 text-blue-600">
              Register...
            </a>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 rounded-md shadow-md p-2 py-1 w-fit text-white text-center"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

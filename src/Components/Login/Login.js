import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Register } from "./Register.js";
import { Button, ButtonToolbar } from "react-bootstrap";

const Login = ({ setIsLogin, isRegister }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isReg, setisReg] = useState(false);

  const login = async () => {
    await axios
      .post("https://localhost:7098/api/Auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("auth", true);
        localStorage.setItem("token", res.data);
        setIsLogin(true);
        navigate("/employee");
      })
      .catch((err) => {
        alert(err);
        setIsLogin(false);
      });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-6/6 md:w-2/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Enter your Username"
            />{" "}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Email
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="mb-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
          <ButtonToolbar>
            <Link to="/register">
              <Button
                className="btn btn-primary btn-lg btn-block mb-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={(e) => {
                  // console.log("This is running", e);
                  setisReg(true);
                }}
              >
                Click here to Register
              </Button>
            </Link>
            {isReg ? <Register /> : null}
          </ButtonToolbar>
        </div>
      </div>
    </section>
  );
};

export default Login;

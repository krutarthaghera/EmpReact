import React, { useState } from "react";
import axios from "axios";

export function Register(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const registeruser = async () => {
    await axios
      .post("https://localhost:7098/api/Auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        // localStorage.setItem("auth", true);
        // localStorage.setItem("token", res.data);
        alert("Registration successful for " + res.data.username);
        //   setIsLogin(true);
        //   navigate("/employee");
      })
      .catch((err) => {
        alert(err);
        //   setIsLogin(false);
      });
  };

  return (
    <div>
      <br />
      <br />
      <input
        type="text"
        className="w-full bg-white rounded mt-2 mb-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Enter Username"
      />
      <input
        type="password"
        className="w-full bg-white mb-2 mt-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Enter Password"
      />
      <button
        className="mb-2 mt-2 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
        onClick={() => {
          registeruser();
        }}
      >
        Register
      </button>
    </div>
  );
}
//export default Register;

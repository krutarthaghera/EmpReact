import React, { useState } from "react";
import { Navigation } from "./Navigation";
import Router from "./Routes/Router";
import Login from "./Components/Login/Login";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("auth"));

  return (
    <>
      {!isLogin ? (
        <div className="login">
          <Login setIsLogin={setIsLogin} />
        </div>
      ) : (
        <div>
          <div className="container">
            <h3 className="m-3 d-flex justify-content-center">
              Employee Management System
            </h3>

            <Navigation setIsLogin={setIsLogin} />

            <Router />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";
import Timer from "./Timer";
import TodoList from "./TodoList";
import Documentation from "./Documentation";

export default function Accueil() {
  return (
    <Fragment>
      <div className="Application">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Timer />
                  <TodoList />
                  <Documentation />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/reset-password"
              element={
                <>
                  <ResetPassword />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Signup />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Fragment>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import useGetUser from "./CustomHooks/useGetUser";
import { useState } from "react";
import AddOrEdit from "./Pages/AddOrEdit";

function App() {
  const [mode, setMode] = useState({ mode: "add", data: null }); // mode state decides whether AddOrEdit page is in 'add' or 'edit' mode

  let { user, loading } = useSelector((state) => state?.auth); // Access user and loading from Redux store

  useGetUser(); // Fetch current user on app load

  // Show loading message while fetching user
  if (loading)
    return <p className="text-center text-2xl font-bold">Loading.....</p>;
  return (
    <>
      <Navbar setMode={setMode} />
      {/* Define routes for the app */}
      <Routes>
        <Route
          path="/"
          element={user ? <Home setMode={setMode} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/addOrEdit"
          element={user ? <AddOrEdit mode={mode} /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer autoClose={1800} />
    </>
  );
}

export default App;

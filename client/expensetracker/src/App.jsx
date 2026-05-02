import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  const navigate = useNavigate();
  const clearAuth = ()=>{
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");

    } catch (error) {
      console.log("Auth error"),error;
    }
    setUser(null);
    setToken(null);
  }
  const handleLogout=()=>{
    clearAuth();
    navigate("/login");
  }
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

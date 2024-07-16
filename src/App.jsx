import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./register/Signup";
import Login from "./register/Login";
import Admin from "./Home/Admin";
import Dashboard from "./Home/Dashboard";

const  { UserContext } =  require("./contexts/UserContext");
function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) navigate("/signup");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loggedIn])
  return (
    <div className="App">
      <UserContext.Provider value={{name, setName, email, setEmail, phone, setPhone, loggedIn, setLoggedIn}}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

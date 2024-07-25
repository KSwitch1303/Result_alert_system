import '../styles/Admin.css'
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    getUsers();
  },[]);
  const getUsers = async () => {
    setIsPending(true);
    const response = await axios.post(`${apiUrl}/getusers`);
    setUsers(response.data.user);    
    setIsPending(false);
  }
  const sendEmail = async (email, name) => {
    setIsPending(true);
    const response = await axios.post(`${apiUrl}/sendMail`, {email, name});
    alert(response.data.data);
    setIsPending(false);
  }
  return ( 
    <div className="admin">
      <h1>Admin Login</h1>
      {users.map((user) => (
        <div className="usercard" key={user._id} >
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => sendEmail(user.email, user.name)}>Send Result</button>
        </div>
      ))}
      <p>{isPending && 'Loading...'}</p>
      <a href="/"><button>Logout</button></a>
    </div>
   );
}
 
export default Admin;
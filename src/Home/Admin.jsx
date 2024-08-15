import '../styles/Admin.css'
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsPending(true);
    const response = await axios.post(`${apiUrl}/getusers`);
    setUsers(response.data.user);    
    setIsPending(false);
  }

  const sendEmail = async (email, name, phone) => {
    setIsPending(true);
    const response = await axios.post(`${apiUrl}/sendMail`, { email, name, phone });
    alert(response.data.data);
    setIsPending(false);
  }

  const sendEmailToAll = async () => {
    setIsPending(true);
    for (let user of users) {
      await axios.post(`${apiUrl}/sendMail`, { email: user.email, name: user.name, phone: user.phone });
    }
    alert('Emails sent to all users');
    setIsPending(false);
  }

  const deleteUser = async (id) => {
    setIsPending(true);
    await axios.delete(`${apiUrl}/deleteUser/${id}`);
    setUsers(users.filter(user => user._id !== id));
    setIsPending(false);
  }

  // const deleteUser = async (id) => {
  //   setIsPending(true);
  //   const response = await axios.delete(`${apiUrl}/deleteUser/${id}`);
  //   alert(response.data.data);
  //   setUsers(users.filter(user => user._id !== id));
  //   setIsPending(false);
  // }
  

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <div className="user-actions">
        <button className="send-all-btn" onClick={sendEmailToAll}>Send Results to All</button>
      </div>
      {isPending && <p>Loading...</p>}
      <div className="user-list">
        {users.map((user) => (
          <div className="usercard" key={user._id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <div className="user-actions">
              <button className="send-btn" onClick={() => sendEmail(user.email, user.name, user.phone)}>Send Result</button>
              <button className="delete-btn" onClick={() => deleteUser(user._id)}>Delete User</button>
            </div>
          </div>
        ))}
      </div>
      <a href="/"><button className="logout-btn">Logout</button></a>
    </div>
  );
}

export default Admin;

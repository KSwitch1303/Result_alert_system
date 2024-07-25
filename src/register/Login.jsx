import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setName, setEmail, setPhone } = useContext(UserContext);
  const [femail, setFemail] = useState("");
  const [fpassword, setFpassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    sendRequest();
  }

  const sendRequest = async (e) => {
    const user = {
      email: femail,
      password: fpassword
    };
    setIsPending(true);
    try {
      const response = await axios.post(`${apiUrl}/login`, user);
      setIsPending(false);
      setLoggedIn(true);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err);
      setIsPending(false);
    }
  }
  return ( 
    <div className="login">
      <div className="loginFormcontainer">
        <h1>Result Alert System</h1>
        <span>Login to get access to our platform</span>
        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="femail">Email</label>
          <input disabled={isPending} type="email" value={femail} onChange={(e) => setFemail(e.target.value)} id="femail" name="femail" placeholder="Enter your email" required />
          <label htmlFor="fpassword">Password</label>
          <input disabled={isPending} type="password" value={fpassword} onChange={(e) => setFpassword(e.target.value)} id="fpassword" name="fpassword" placeholder="Enter your password" required />          
          <button disabled={isPending} type="submit">{isPending ? 'Logging in...' : 'Login'}</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
   );
}
 
export default Login;
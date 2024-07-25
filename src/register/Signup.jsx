import '../styles/Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const[femail, setFemail] = useState("");
  const [fphone, setFphone] = useState("");
  const [fpassword, setFpassword] = useState("");
  const [fconfirmPassword, setFconfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    checkPassword();
  }
  const checkPassword = (e) => {
    if (fpassword !== fconfirmPassword) {
      alert('Passwords do not match');
      setIsPending(false);
      return;
    } else {
      sendRequest();
    }
  }
  const sendRequest = async (e) => {
    const user = {
      name: fname,
      email: femail,
      phone: fphone,
      password: fpassword
    };
    setIsPending(true);
    try {
      const response = await axios.post(`${apiUrl}/signup`, user);
      setIsPending(false);
      if (response.status === 200) {
        navigate('/login');
      } else {
        alert(response.data.data);
      }
    } catch (err) {
      alert(err);
      setIsPending(false);
    }
  }
  return ( 
    <div className="signup">
      <div className="signupFormcontainer">
        <h1>Result Alert System</h1>
        <span>Sign up to get access to our platform</span>
        <form onSubmit={handleSubmit} className="signupForm">
          <label htmlFor="fname">Full Name</label>
          <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} id="fname" name="fname" placeholder="Enter your fullname" required />
          <label htmlFor="femail">Email</label>
          <input type="email" value={femail} onChange={(e) => setFemail(e.target.value)} id="femail" name="femail" placeholder="Enter your email" required />
          <label htmlFor="fphone">Phone</label>
          <input type="text" value={fphone} onChange={(e) => setFphone(e.target.value)} id="fphone" name="fphone" placeholder="Enter your phone number" required />
          <label htmlFor="fpassword">Password</label>
          <input type="password" value={fpassword} onChange={(e) => setFpassword(e.target.value)} id="fpassword" name="fpassword" placeholder="Enter your password" required />
          <label htmlFor="fconfirmPassword">Confirm Password</label>
          <input type="password" value={fconfirmPassword} onChange={(e) => setFconfirmPassword(e.target.value)} id="fconfirmPassword" name="fconfirmPassword" placeholder="Confirm your password" required />
          <button type="submit">{isPending ? 'Signing up...' : 'Sign up'}</button>
        </form>
        <p>Alredy have an account? <Link disabled={isPending} to="/login">Login</Link></p>
      </div>
    </div>
   );
}
 
export default Signup;
import '../styles/Dashboard.css'
const Dashboard = () => {

  return ( 
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>You'll receive the result via email and sms when it's published</p>
      <a href="/"><button>Logout</button></a>
    </div>
   );
}
 
export default Dashboard;
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext";

export default function Homepage() {
  const { user, logout } = useAuth();
  return (
    <>
      <h2>Health Tracker Plus</h2>
      <h3>Welcome to your Health Tracking Base Station</h3>
      <p>Ready to start your journey?</p>
      <div className="login-links">
        {!user ? (
          <>
            <Link to="/signup"><button className="home-signup">Sign Up</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </>
        ) : (
          <Link to="/login" onClick={logout}><button>Logout</button></Link>
        )}
      </div>
    </>
  )
}
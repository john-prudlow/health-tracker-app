import { Link } from 'react-router';
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header>
      <div className="branding"><h1><Link to="/">HealthTrackerPlus</Link></h1></div>
      <nav>
        <ul className="utility-menu">
          {!user ? (
            <>
              <li className="login-link"><Link to="/login">Login</Link></li>
              <li className="signup-link"><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <li className="logout-link"><Link to="/login" onClick={logout}>Logout</Link></li>
          )}
        </ul>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/health-data">Health</Link></li>
          <li><Link to="/trends">Trends</Link></li>
        </ul>
      </nav>
    </header>
  )
}
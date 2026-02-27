import { Link } from 'react-router';

export default function Header() {
  return (
    <header>
      <div className="branding"><h1>HealthTrackerPlus</h1></div>
      <nav>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/health-data">Health</Link></li>
          <li><Link to="/trends">Trends</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  )
}
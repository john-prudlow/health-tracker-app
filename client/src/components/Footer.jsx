import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/health-data">Health</Link></li>
          <li><Link to="/trends">Trends</Link></li>
        </ul>
      </nav>
    </footer>
  )
}
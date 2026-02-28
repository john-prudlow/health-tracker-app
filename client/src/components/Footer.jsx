import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/health-data">Health Data</Link></li>
          <li><Link to="/trends">Data Trends</Link></li>
        </ul>
      </nav>
    </footer>
  )
}
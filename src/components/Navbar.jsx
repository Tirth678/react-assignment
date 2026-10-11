import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">College Management</h1>
        <ul className="navbar-menu">
          <li>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/students" className="navbar-link">Students</Link>
          </li>
          <li>
            <Link to="/courses" className="navbar-link">Courses</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav className="d-flex align-items-center justify-content-between p-3 bg-dark">
      <Link to="/" className="text-decoration-none">
        <h1 className="text-primary">EVENTFUL</h1>
      </Link>

      <ul className="nav">
        <li className="nav-item">
          <NavLink to="/creator-signup" className="nav-link">
            Signup as Creator
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/eventee-signup" className="nav-link">
            Signup as Eventee
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/creator-login" className="btn btn-primary">
            Creator Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/eventee-login" className="btn btn-primary">
            Eventee Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/Logo.png" alt="LOGO" height="70px" />
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications">Notifications</NavLink>
        </li>
        <li>
          <NavLink to="/legislation">Legislation</NavLink>
        </li>

        <li>
          <NavLink to="/vote">Vote/Feedback</NavLink>
        </li>
        <li>
          <NavLink to="/impact">Impact</NavLink>
        </li>
        <li>
          <NavLink to="/initiatives">Initiatives</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

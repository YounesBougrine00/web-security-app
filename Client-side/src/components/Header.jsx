import { NavLink } from "react-router-dom";
import "../style/header.css";

function Header() {
  return (
    <div className="header">
      <nav className="navigation">
        <ul>
          <li>
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/clients">
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/orders">
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;

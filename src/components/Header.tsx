import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Blogg</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Min sida</NavLink>
          </li>
          <li>
            {!user ? (
              <NavLink to="/login">Logga in</NavLink>
            ) : (
              <button onClick={logout}>Logga ut</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

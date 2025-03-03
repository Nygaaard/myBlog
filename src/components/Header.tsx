import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/login">Hem</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

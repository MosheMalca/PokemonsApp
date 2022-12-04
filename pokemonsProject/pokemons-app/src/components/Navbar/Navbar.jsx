import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div id="navbar">
      <Link to="/">Home</Link>|<Link to="/add">Add</Link>
    </div>
  );
};

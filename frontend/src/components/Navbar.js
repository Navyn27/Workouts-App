import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div>
        <button onClick={handleClick}>Logout</button>
      </div>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    window.alert("New account created");
  };

  return (
    <form className="login" onSubmit={createAccount}>
      <h1>Login</h1>
      <label>Email</label>
      <input
        type="text"
        required="true"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label>Password</label>
      <input
        type="password"
        required="true"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;

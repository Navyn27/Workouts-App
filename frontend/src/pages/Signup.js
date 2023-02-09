import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const createAccount = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={createAccount}>
      <h1>Signup </h1>
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
      <button disabled={isLoading}>SignUp</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;

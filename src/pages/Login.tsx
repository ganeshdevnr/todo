import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const { login } = useAuth(); // ✅ Get login method from context
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    try {
      await login(email, password); // ✅ Use login from context
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4" id="login-page">
      <h2 className="text-lg font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 mt-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 mt-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className="w-full p-2 mt-4 cursor-pointer bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

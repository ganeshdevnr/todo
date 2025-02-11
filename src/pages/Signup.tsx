import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

const Signup = () => {
  const { signup, login } = useAuth(); // ✅ Get login method from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);

    try {
      const user = await signup(email, password); // ✅ Use login from context
      if (!user) return;

      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4" id="signup-page">
      <h2 className="text-lg font-bold">Create Account</h2>

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
        onClick={handleSignup}
      >
        Create Account
      </button>

      <a
        onClick={() => navigate("/login")}
        className="text-gray-300 underline cursor-pointer flex justify-end"
      >
        Back to Login
      </a>
    </div>
  );
};

export default Signup;

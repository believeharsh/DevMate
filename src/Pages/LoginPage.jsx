import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import Spinner from "../Components/General/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Tagline */}
        <div className="text-center space-y-2">
          {/* You can replace this div with an actual logo image */}
          <div className="text-4xl font-extrabold text-blue-500">🧠</div>
          <h1 className="text-3xl font-bold">Devetime Companion</h1>
          <p className="text-gray-400 text-sm">
            Your personal productivity dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Spinner size="sm" /> <span>Logging in...</span>
              </div>
            ) : (
              "Log In"
            )}
          </button>

          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;


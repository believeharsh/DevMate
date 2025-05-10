import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import Spinner from "../../General/Spinner.jsx"; // Adjust path if needed

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
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
          <div className="text-4xl font-extrabold text-blue-500">🧠</div>
          <h1 className="text-3xl font-bold">Devetime Companion</h1>
          <p className="text-gray-400 text-sm">
            Your personal productivity dashboard
          </p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSignup}
          className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Create Your Account</h2>

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
                <Spinner size="sm" />
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

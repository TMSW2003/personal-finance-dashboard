import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from '../components/header.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password"
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent! Check your inbox.");
      setEmail("");

      // Redirect to "Check Email" page
      //setTimeout(() => navigate("/check-email"), 2000);
    }
  };

  // Auto-hide messages
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      <Header/>
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-8 ">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border rounded mb-3 "
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </>
  );
}

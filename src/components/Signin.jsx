import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(email, password); // Use your signIn function

    if (error) {
      setError(error); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      navigate("/dashboard");
    }

    if (session) {
      closeModal();
      setError(""); // Reset the error when there's a session
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setError(error.message);
    } else {
      setForgotMessage("Password reset email sent! Check your inbox.");
      setForgotEmail("");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign in</h2>
        <p>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Email">Email</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col py-4">
          {/* <label htmlFor="Password">Password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mt-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button className="w-full mt-4">Sign In</button>
        <p
          className="text-sm text-right mt-3"
          onClick={() => navigate("/forgot-password")}
        >
          <Link 
            to="/forgot-password" 
            className = "text-blue-500 hover:underline cursor-pointer"
          >
            Forgot password?
          </Link>
        </p>
        

      
        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
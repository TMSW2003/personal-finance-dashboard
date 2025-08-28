import { useState } from "react";
import { supabase } from "../supabaseClient";
import Header from '../components/header.jsx';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      navigate("/"); 
    }
  };

  return (
    <>
      <Header/>
      <div className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mt-2 w-full"
        />
        <button onClick={handleUpdatePassword} className="w-full mt-4">
          Update Password
        </button>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </>
  );
}

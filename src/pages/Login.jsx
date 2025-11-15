import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Google Login Successful");
      nav(from, { replace: true });
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-8 flex flex-col gap-4"
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold text-green-600 text-center mb-2">
        Login to EcoTrack
      </h2>

      {/* Email */}
      <label className="text-gray-700 font-medium">Email</label>
      <input
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
      />

      {/* Password */}
      <label className="text-gray-700 font-medium">Password</label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg pr-12 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <span
          onClick={() => setShowPass(!showPass)}
          className="absolute top-1/2 -translate-y-1/2 right-3 text-xl cursor-pointer text-gray-600"
        >
          {showPass ? <FiEye />  : <FiEyeOff /> }
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-green-300"
        >
          {loading ? "Logging..." : "Login"}
        </button>

        {/* Google Button */}
        <button
          type="button"
          onClick={onGoogle}
          disabled={loading}
          className="flex-1 bg-white border hover:bg-gray-100 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:bg-gray-200"
        >
          <FcGoogle size={22} />
          Google
        </button>
      </div>

      {/* Links */}
      <div className="text-center mt-3 space-x-3">
        <Link to="/forgot-password" className="text-red-600 font-medium">
          Forgot Password?
        </Link>

        <Link
          to="/register"
          className="text-green-600 underline font-medium"
        >
          Register
        </Link>
      </div>
    </form>
  );
}

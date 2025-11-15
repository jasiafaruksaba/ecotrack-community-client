import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const { register, googleLogin } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const nav = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 6) return "Minimum length 6";
    if (!/[A-Z]/.test(pw)) return "At least 1 uppercase";
    if (!/[a-z]/.test(pw)) return "At least 1 lowercase";
    if (!/[!@#$%^&*()_\-+={}[\]|;:\"<>,.?/~`]/.test(pw))
      return "At least 1 special character";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const pwErr = validatePassword(form.password);
    if (pwErr) return toast.error(pwErr);

    try {
      setLoading(true);
      await register(form.name, form.email, form.password, form.photoURL);
      toast.success("Registered");
      nav("/");
    } catch (err) {
      toast.error(err?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await googleLogin();
      toast.success("Registered via Google");
      nav("/");
    } catch (e) {
      toast.error("Google auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-4"
      >
        {/* Heading */}
        <h3 className="text-center text-3xl font-bold text-green-600">
          Join EcoTrack
        </h3>

        {/* Name */}
        <label className="font-semibold">Name</label>
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Photo URL */}
        <label className="font-semibold">Photo URL</label>
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          value={form.photoURL}
          onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
        />

        {/* Password with Eye Icon */}
        <label className="font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Eye Icon Always Visible */}
          <span
            className="absolute right-3 top-2 cursor-pointer text-xl text-gray-600"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg 
                       hover:bg-green-700 active:bg-green-800 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="w-full bg-white border border-gray-300 flex items-center justify-center
                       gap-2 font-semibold py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>
        </div>

        {/* Login link */}
        <div className="text-center pt-2">
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

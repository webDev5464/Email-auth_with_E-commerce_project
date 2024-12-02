/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AdminLoginHandler } from "../../toolkits/Thunks/AdminThunk";

export default function AdminLogin() {
  const dispatch = useDispatch()
  const { adminLogin } = useSelector(state => state.adminStore)
  const navigate = useNavigate()

  useEffect(() => {
    if (adminLogin) {
      navigate("/admin/")
    }
  }, [adminLogin])

  const [formData, setFormData] = useState({
    email: "",
    pass: ""
  })

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(AdminLoginHandler(formData))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={inputHandler}
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={inputHandler}
                name="pass"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 px-6 py-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? <Link to={"/register"} className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

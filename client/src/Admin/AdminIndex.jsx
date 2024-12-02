import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminIndex() {
  const navigate = useNavigate()
  const { adminLogin } = useSelector(state => state.adminStore)

  useEffect(() => {
    if (!adminLogin) {
      navigate("/admin/login")
    }
  }, [adminLogin])

  return (
    <div>
      <Outlet />
    </div>
  )
}

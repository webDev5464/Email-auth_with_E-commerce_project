/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./modules/Navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserValidationHandler } from "../toolkits/Thunks/UserThunk";
import { OtpProcessHandler } from "../toolkits/Slices/UserSlice";

export default function UserIndex() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { otpProcess } = useSelector(state => state.userStore)

  useEffect(() => {
    dispatch(UserValidationHandler())
  }, [])

  useEffect(() => {
    if (otpProcess) {
      navigate('/login')
    }
    setTimeout(() => {
      OtpProcessHandler(false)
    }, 2000)
  }, [otpProcess])

  return (
    <>
      <Navigation />

      <Outlet />
    </>
  )
}

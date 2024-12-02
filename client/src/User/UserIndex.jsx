/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./modules/Navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserValidationHandler } from "../toolkits/Thunks/UserThunk";
import { OtpCancelButton, OtpProcessHandler, RegisterProcessHandler } from "../toolkits/Slices/UserSlice";

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
      dispatch(OtpProcessHandler(false))
      dispatch(RegisterProcessHandler(false))
    }
  }, [otpProcess])

  return (
    <>
      <Navigation />

      <Outlet />
    </>
  )
}

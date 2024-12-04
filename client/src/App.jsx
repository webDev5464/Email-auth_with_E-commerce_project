import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GetProducts } from "./toolkits/Thunks/ProductThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Zoom
      />

      <Outlet />
    </>
  )
}

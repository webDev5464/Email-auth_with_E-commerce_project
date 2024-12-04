/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerWithOtpHandler, ResendnewOtp, UserRegisterHandler } from "../../toolkits/Thunks/UserThunk";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { OtpCancelButton, OtpProcessHandler } from "../../toolkits/Slices/UserSlice";

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registerProcess, otpProcess } = useSelector(state => state.userStore)

  useEffect(() => {
    if (otpProcess) {
      navigate('/')
      dispatch(OtpProcessHandler(false))
    }
  }, [otpProcess])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    conPass: ""
  })

  const [otpPin, setOtpPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
    email: formData.email
  })

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
    setOtpPin({ ...otpPin, [name]: value })
  }

  const formHandler = (e) => {
    e.preventDefault()

    dispatch(UserRegisterHandler({ formData }))
  }

  const otpFormHandler = (e) => {
    e.preventDefault()

    dispatch(registerWithOtpHandler({ otpPin }))
  }

  const OtpInput = (e) => {
    const { name, value } = e.target
    setOtpPin({ ...otpPin, [name]: value })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      {registerProcess ? (
        <>
          <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <button className="absolute right-0 top-0 m-2 text-xl" onClick={() => dispatch(OtpCancelButton())}><MdCancel /></button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Enter OTP</h2>
            <p className="text-gray-600 text-sm text-center mb-6">Please enter the 6-digit OTP sent to your email.</p>
            <form onSubmit={otpFormHandler} className="flex flex-col items-center">
              <div className="flex justify-between space-x-2 mb-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`pin${index + 1}`}
                    onChange={OtpInput}
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Verify OTP
              </button>
            </form>
            <p className="text-gray-600 text-sm text-center mt-4">
              Didn't receive the OTP?{" "}
              <button onClick={()=> dispatch(ResendnewOtp(formData))} className="text-green-500 hover:underline">Resend</button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
              <form onSubmit={formHandler}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    onChange={inputHandler}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={inputHandler}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="pass"
                  >
                    Password
                  </label>
                  <input
                    onChange={inputHandler}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pass"
                    type="pass"
                    name="pass"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="conPass"
                  >
                    Confirm Password
                  </label>
                  <input
                    onChange={inputHandler}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="conPass"
                    type="password"
                    name="conPass"
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                  // onClick={() => dispatch(OtpCancelButton(true))}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-gray-100 px-6 py-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account? <Link to={"/login"} className="text-green-500 hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;

// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { registerWithOtpHandler, UserRegisterHandler } from "../../toolkits/Thunks/UserThunk";
// import { useState, useEffect } from "react";
// import { MdCancel } from "react-icons/md";
// import { OtpCancelButton } from "../../toolkits/Slices/UserSlice";

// function Register() {
//   const dispatch = useDispatch();
//   const { registerProcess } = useSelector((state) => state.userStore);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     pass: "",
//     conPass: "",
//   });

//   const [otpPin, setOtpPin] = useState({
//     pin1: "",
//     pin2: "",
//     pin3: "",
//     pin4: "",
//     pin5: "",
//     pin6: "",
//   });

//   const [timer, setTimer] = useState(60); // Timer in seconds
//   const [resendDisabled, setResendDisabled] = useState(true);

//   // Countdown Timer Logic
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(countdown); // Cleanup interval
//     } else {
//       setResendDisabled(false); // Enable resend button after timer ends
//     }
//   }, [timer]);

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const formHandler = (e) => {
//     e.preventDefault();
//     dispatch(UserRegisterHandler({ formData }));
//     setTimer(60); // Reset timer when new OTP is sent
//     setResendDisabled(true);
//   };

//   const otpFormHandler = (e) => {
//     e.preventDefault();
//     dispatch(registerWithOtpHandler({ otpPin, email: formData.email }));
//   };

//   const resendOtpHandler = () => {
//     setTimer(60); // Reset timer after resending OTP
//     setResendDisabled(true);
//   };

//   const OtpInput = (e) => {
//     const { name, value } = e.target;
//     setOtpPin({ ...otpPin, [name]: value });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-950">
//       {registerProcess ? (
//         <>
//           <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
//             <button
//               className="absolute right-0 top-0 m-2 text-xl"
//               onClick={() => dispatch(OtpCancelButton())}
//             >
//               <MdCancel />
//             </button>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Enter OTP</h2>
//             <p className="text-gray-600 text-sm text-center mb-6">
//               Please enter the 6-digit OTP sent to your email.
//             </p>
//             <form onSubmit={otpFormHandler} className="flex flex-col items-center">
//               <div className="flex justify-between space-x-2 mb-6">
//                 {Array.from({ length: 6 }).map((_, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     name={`pin${index + 1}`}
//                     onChange={OtpInput}
//                     maxLength={1}
//                     className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   />
//                 ))}
//               </div>
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
//               >
//                 Verify OTP
//               </button>
//             </form>
//             <p className="text-gray-600 text-sm text-center mt-4">
//               Resend OTP in:{" "}
//               <span className="text-red-500">{timer > 0 ? `${timer}s` : <button className="text-green-500 hover:underline" onClick={resendOtpHandler}>Resend</button>}</span>
//             </p>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
//             <div className="px-6 py-4">
//               <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
//               <form onSubmit={formHandler}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//                     Username
//                   </label>
//                   <input
//                     onChange={inputHandler}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="username"
//                     type="text"
//                     name="username"
//                     placeholder="Enter your username"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                     Email Address
//                   </label>
//                   <input
//                     onChange={inputHandler}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="email"
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pass">
//                     Password
//                   </label>
//                   <input
//                     onChange={inputHandler}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="pass"
//                     type="password"
//                     name="pass"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conPass">
//                     Confirm Password
//                   </label>
//                   <input
//                     onChange={inputHandler}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="conPass"
//                     type="password"
//                     name="conPass"
//                     placeholder="Confirm your password"
//                   />
//                 </div>
//                 <button
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
//                   type="submit"
//                 >
//                   Register
//                 </button>
//               </form>
//             </div>
//             <div className="bg-gray-100 px-6 py-4 text-center">
//               <p className="text-gray-600 text-sm">
//                 Already have an account?{" "}
//                 <Link to={"/login"} className="text-green-500 hover:underline">
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Register;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogoutHandler } from "../../toolkits/Thunks/UserThunk";

function Home() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userStore);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {userData !== null ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userData.username}!</h1>
            <div className="text-left mb-6">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Username:</span> {userData.username}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Email:</span> {userData.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">User ID:</span> {userData._id}
              </p>
            </div>
            <button
              onClick={() => dispatch(UserLogoutHandler())}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button >
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MyApp</h1>
            <p className="text-gray-600 mb-6">
              This is a simple application where you can register and log in to access your dashboard. Start by signing up or logging in below.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div >
    </div >
  );
}

export default Home;

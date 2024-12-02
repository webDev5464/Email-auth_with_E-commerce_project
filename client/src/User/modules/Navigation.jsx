import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogoutHandler } from "../../toolkits/Thunks/UserThunk";

function Navigation() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userStore)
  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white font-bold text-xl">MyApp</h1>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-blue-700 active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            {userData ? (
              <>
                <button
                  className="text-white hover:bg-red-700 active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => dispatch(UserLogoutHandler())}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-blue-700 active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogoutHandler } from "../../toolkits/Thunks/UserThunk";

function Navigation() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userStore)
  return (
    <nav className="bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-20">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
           <img className="h-12 w-12 shadow-xl rounded-sm" src="https://t3.ftcdn.net/jpg/02/45/84/16/240_F_245841615_d7QzRv937jfiC176rmKK60ckNXU9V76z.jpg" alt="logo image" />
          </div>
          <div className="flex justify-around items-center ">
          <Link
              to="/"
              className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/product"
              className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
            >
              Product
            </Link>
            <Link
              to="/watchlist"
              className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
            >
              Watchlist
            </Link>
            <Link
              to="/cart"
              className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
            >
              Cart
            </Link>
          </div>
          <div className="flex space-x-4">

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
                  className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:underline hover:text-black hover:scale-110 duration-300  active:scale-95 px-3 py-2 rounded-md text-sm font-medium"
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

import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
import Home from './User/pages/Home'
import Login from './User/pages/Login'
import Register from './User/pages/Register'
import UserIndex from './User/UserIndex'
import { Provider } from 'react-redux'
import Store from './toolkits/Store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <UserIndex />,
        children: [
          { path: '/', element: <Home /> },
          { path: 'Login', element: <Login /> },
          { path: 'Register', element: <Register /> },
        ]
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
)

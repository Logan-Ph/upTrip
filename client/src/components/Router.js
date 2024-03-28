import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Unauthorized from "../pages/Unauthorized";
import PersistAndRequireAuth from "./PersistAndRequireAuth";
import VerifyEmail from "../pages/VerifyEmail";
import PageNotFound from "../pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../pages/SignUp";

export default function Router() {
  const UserLayout = ({ header, footer }) => {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          stacked
        />
        {header}
        <Outlet />
        {footer}
      </>
    );
  };

  	const BrowserRoutes = createBrowserRouter([
    {
		path: "/",
		element: <UserLayout header={<Header />} footer={<Footer />} />,
		children: [
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/unauthorized",
				element: <Unauthorized />,
			},
			{
				path: "/verify-email",
				element: <VerifyEmail />,
			},
			{
				path: "/",
				element: <PersistAndRequireAuth />,
				children: [
					{
					path: "/admin",
					element: <Admin />,
					},
				],
			},
      	],
    },
    {
		path: "/signup",
		element: <SignUp />,
    },
    {
		path: "/login",
		element: <Login />,
    },
    {
		path: "*",
		element: <PageNotFound />,
    },
  	]);

  return <RouterProvider router={BrowserRoutes} />;
}

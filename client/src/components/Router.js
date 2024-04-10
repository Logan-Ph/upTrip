import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import PersistAndRequireAuth from "./PersistAndRequireAuth";
import VerifyEmail from "../pages/VerifyEmail";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import QuickSearch from '../pages/QuickSearch'
const Admin = lazy(() => import('../pages/Admin'));
const Homepage = lazy(() => import('../pages/Homepage'))

export default function Router() {
	const UserLayout = ({ header, footer }) => {
		return (
			<>
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
					element: 
					<Suspense fallback={<div>Loading...</div>}>
						<Homepage />
					</Suspense>
				},
				{
					path: "/unauthorized",
					element: <Unauthorized />,
				},
				{
					path: "/quick-search",
					element: <QuickSearch />
				},
				{
					path: "/",
					element: <PersistAndRequireAuth />,
					children: [
						{
							path: "/admin",
							element:
								<Suspense fallback={<div>Loading...</div>}>
									<Admin />
								</Suspense>
						},
					],
				},
			],
		},
		{
			path: "user/:token/verify-email",
			element: <VerifyEmail />,
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

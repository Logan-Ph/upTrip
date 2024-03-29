import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import Unauthorized from '../pages/Unauthorized'
import PersistAndRequireAuth from './PersistAndRequireAuth'
import VerifyEmail from '../pages/VerifyEmail'
import PageNotFound from '../pages/PageNotFound'
import SignUp from "../pages/SignUp";
import LinkExpried from '../pages/LinkExpired'


export default function Router() {
	const UserLayout = ({ header, footer }) => {
		return (
			<>
				{header}
				<Outlet />
				{footer}
			</>
		)
	}

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
					path: "*",
					element: <PageNotFound />,
				},
				{
					path: "/verify-email",
					element: <VerifyEmail />,
				},
				{
					path: "/link-expired",
					element: <LinkExpried />,
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
	]);

	return (
		<RouterProvider router={BrowserRoutes} />
	)
}


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
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

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
                />
                {header}
                <Outlet />
                {footer}
            </>
        )
    }

    const BrowserRoutes = createBrowserRouter([
        {
            path: '/',
            element: <UserLayout header={<Header />} footer={<Footer />} />,
            children: [
                {
                    path: '/',
                    element: <Homepage />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/unauthorized',
                    element: <Unauthorized />
                },
                {
                    path: '*',
                    element: <PageNotFound/>
                },
				{
					path: '/verify-email',
					element: <VerifyEmail />
				},
				{
					path: '/',
					element: <PersistAndRequireAuth/>,
					children: [
						{
							path: '/admin',
							element: <Admin />
						}
					]
				},
            ]
        },
        
    ])

    return (
        <RouterProvider router={BrowserRoutes} />
    )
}


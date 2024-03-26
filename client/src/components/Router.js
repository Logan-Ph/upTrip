import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import VerifyEmail from '../pages/VerifyEmail'
import PageNotFound from '../pages/PageNotFound'

export default function Router(){
    const UserLayout = ({header, footer}) => {
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
            path: '/',
            element: <UserLayout header={<Header />} footer={<Footer />} />,
            children: [
                {
                    path: '/',
                    element: <Homepage />
                },
                {
                    path: '*',
                    element: <h1>404</h1>
                },
               
            ]
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/verify-email',
            element: <VerifyEmail />
        },
        {
            path: '/page-not-found',
            element: <PageNotFound />
        },


    ])

    return (
        <RouterProvider router={BrowserRoutes} />
    )
}


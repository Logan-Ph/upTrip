import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'

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

    ])

    return (
        <RouterProvider router={BrowserRoutes} />
    )
}


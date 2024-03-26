import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import { UserProvider } from '../context/UserContext'

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
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '*',
                    element: <h1>404 Page not found</h1>
                }
            ]
        }
    ])

    return (
      <UserProvider>
        <RouterProvider router={BrowserRoutes} />
      </UserProvider>
    )
}


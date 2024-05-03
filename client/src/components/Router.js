import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import Header from "./Header";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import PersistAndRequireAuth from "./PersistAndRequireAuth";
import VerifyEmail from "../pages/VerifyEmail";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import QuickSearch from "../pages/QuickSearch";
import AdvancedSearchResultPage from "../pages/AdvancedSearchHotelPage";
import AdvancedSearchFlightPage from "../pages/AdvancedSearchFlightPage";
import AdvancedSearchExperiencePage from "../pages/AdvancedSearchExperiencePage";
import Itinerary from "../pages/Itinerary";
import DetailedItinerary from "../pages/DetailedItinerary";
const Homepage = lazy(() => import("../pages/Homepage"));

export default function Router() {
    const BrowserRoutes = createBrowserRouter([
        {
            path: "/",
            element: (
                <PersistAndRequireAuth
                    header={<HomeHeader />}
                    footer={<footer />}
                />
            ),
            children: [
                {
                    path: "/",
                    element: <Homepage />,
                },
                {
                    path: "/unauthorized",
                    element: <Unauthorized />,
                },
            ],
        },
        {
            path: "/",
            element: (
                <PersistAndRequireAuth
                    header={<Header />}
                    footer={<footer />}
                />
            ),
            children: [
                {
                    path: "/quick-search",
                    element: <QuickSearch />,
                },
                {
                    path: "/advanced-hotel-search",
                    element: <AdvancedSearchResultPage />,
                },
                {
                    path: "/advanced-flight-search",
                    element: <AdvancedSearchFlightPage />,
                },
                {
                    path: "/advanced-experience-search",
                    element: <AdvancedSearchExperiencePage />,
                },
                {
                    path: "/itinerary",
                    element: <Itinerary />,
                },
                {
                    path: "/detailed-itinerary",
                    element: <DetailedItinerary />,
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

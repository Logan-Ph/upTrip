import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistAndRequireAuth = ({ header, footer }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <>
            {header}
            <Outlet />
            {footer}
        </>
    );
};

export default PersistAndRequireAuth;

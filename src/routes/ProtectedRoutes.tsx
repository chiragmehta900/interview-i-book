import React from "react";
import moment from "moment";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const authData = JSON.parse(localStorage.getItem("I-BOOK")!);
    const [isAllowed, setIsAllowed] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (authData) {
            if (authData.expiresIn < moment().unix()) {
                setIsAllowed(false);
                localStorage.removeItem('I-BOOK');
            } else {
                setIsAllowed(true);
            }
        } else {
            setIsAllowed(false);
            localStorage.removeItem('I-BOOK');
        }
    }, [authData, authData?.token]);

    return isAllowed ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
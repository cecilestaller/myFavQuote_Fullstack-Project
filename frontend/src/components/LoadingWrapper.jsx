import { useEffect, useState } from "react";
import { doSilentRefresh, silentRefreshLoop } from "../utils/tokens";
import { Navigate } from "react-router-dom";

const LoadingWrapper = ({ authorization, saveAuthorization, children }) => {
    const [isLoading, setIsLoading] = useState(true);

    console.log({ isLoading, authorization });

    useEffect(() => {
        async function tryRefreshToken() {
            if (!isLoading) return;
            if (authorization) {
                // --> user already logged in with valid accessToken
                setIsLoading(false);
                return;
            }
            // no valid accesToken BUT evetually valid refreshToken in Cookies: try silentRefresh
            try {
                const accessToken = await doSilentRefresh();
                const authorization = `Bearer ${accessToken}`;
                saveAuthorization(authorization); // Lifting state up to App.jsx
                setIsLoading(false);

                silentRefreshLoop(accessToken, (newAccessToken) => {
                    const authorization = `Bearer ${newAccessToken}`;
                    saveAuthorization(authorization);
                });
            } catch (error) {
                console.log("Something went wrong in Loading Wrapper");
                console.log(error);
                setIsLoading(false);
            }
        }

        tryRefreshToken();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (authorization) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/"} />;
    }
};

export default LoadingWrapper;

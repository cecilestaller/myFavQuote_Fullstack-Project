import { useEffect, useState } from "react";
import { doSilentRefresh, silentRefreshLoop } from "../utils/tokens";
import { Navigate } from "react-router-dom";
import { backendUrl } from "../api";

const LoadingWrapper = ({
    authorization,
    saveAuthorization,
    children,
    userProfileInfo,
    saveUserProfileInfo,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    // console.log({ isLoading, authorization });

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

                const response = await fetch(`${backendUrl}/api/v1/users`, {
                    headers: { authorization },
                });
                const { success, result, error } = await response.json();
                await saveUserProfileInfo(result);

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

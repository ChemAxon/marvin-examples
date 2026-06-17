import { ReactMarvin } from "@chemaxon/marvin";
import { getDefaultSettings } from "@chemaxon/marvin/marvin-extensions";
import { useOktaAuth } from "@okta/okta-react";
import { MARVIN_WEBSERVICES_HOST } from "./OktaAppConfig";

export const OktaMarvin: React.FC = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return null;
    }

    const login = async (): Promise<void> => {
        await oktaAuth.signInWithRedirect();
    };

    const logout = async (): Promise<void> => {
        await oktaAuth.signOut();
    };

    if (authState.isAuthenticated) {
        const marvinSettings = getDefaultSettings(MARVIN_WEBSERVICES_HOST);
        if (marvinSettings.webServiceSettings) {
            marvinSettings.webServiceSettings.getJWT = () => authState?.accessToken?.accessToken as string;
        }

        return (
            <>
                <p>Logged in&nbsp;&nbsp;&nbsp;
                    <button onClick={logout}>Logout</button>
                </p>
                <ReactMarvin
                    settings={marvinSettings}
                    onReady={() => { console.log("Marvin is ready.") }}
                    onError={(reason) => { console.error("Failed to create Marvin:", reason) }}
                />
            </>
        )
    } else {
        return (
            <>
                <p>Logged out&nbsp;&nbsp;&nbsp;
                    <button onClick={login}>Login</button>
                </p>
            </>
        )
    }
};

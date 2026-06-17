import OktaAuth from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { OktaMarvin } from "./OktaMarvin";
import { oktaAppConfig } from "./OktaAppConfig";


const oktaAuth = new OktaAuth(oktaAppConfig);

const SecurityWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const navigate = useNavigate();

    const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string): Promise<void> => {
        navigate(originalUri || "/", { replace: true });
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            {children}
        </Security>
    );
};

const OktaAppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<OktaMarvin />} />
            <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
    )
}

export const OktaApp: React.FC = () => {
    return (
        <BrowserRouter>
            <SecurityWrapper>
                <OktaAppRoutes />
            </SecurityWrapper>
        </BrowserRouter>
    );
};

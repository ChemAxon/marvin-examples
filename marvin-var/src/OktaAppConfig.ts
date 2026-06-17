import { OktaAuthOptions } from "@okta/okta-auth-js";

// This value is provided by the backend hosting team in exchange for:
// - The issuer value of the JWT
// - JWKS URL of the provider
// Currently this is a placeholder value
export const MARVIN_WEBSERVICES_HOST = "https://marvin-server.placeholder.cxcloud.io/";

export const oktaAppConfig: OktaAuthOptions = {
    // These values are provided by the OIDC provider during the registration of the application
    // Currently this is a placeholder value
    issuer: "https://oktapreview.chemaxon.com/oauth2/placeholder",
    clientId: "placeholder1", // This is the client ID of the application
    redirectUri: window.location.origin + "/login/callback", // This is the redirect URI of the application
    scopes: ["openid", "profile", "email"], // This is the scope of the application necessary for the OAUTH2 flow
    pkce: true, // This is the PKCE mode of the application
};

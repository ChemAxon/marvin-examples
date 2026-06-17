# Marvin React + Remote Backend (Okta OIDC Example)

This repository shows how to embed the `marvin-react` library while using a
remotely hosted backend. The example uses Okta for authentication, but any OIDC
provider can be substituted. For this integration we will be following this process: https://developer.okta.com/docs/guides/sign-into-spa-redirect/react/main/
In those cases follow the OIDC provider and SDK documentation on how to configure them.
Common alternatives include: 
  - https://learn.microsoft.com/es-es/entra/msal/javascript/
  - https://auth0.com/docs/libraries

## Other Documentation links

The following links should be studied for further details of this integration
- https://apidocs.chemaxon.com/marvinpro/index.html This contains the documentation of the methods used below.

## What this example does

- Uses Okta (OIDC) to authenticate a user.
- Retrieves an access token from the OIDC provider.
- Passes that token to the remote Marvin backend.
- Uses a backend host value provided by the hosting team.

## Prerequisites (packages and services)

- Node.js + npm
- An Okta (or other OIDC) tenant
- Access to a remotely hosted Marvin backend (provided by the backend hosting team)
- Packages used by this example:
  - `@chemaxon/marvin`: Marvin React component and webservice client.
  - `@okta/okta-auth-js`: Low-level Okta OIDC client.
  - `@okta/okta-react`: React bindings for Okta auth state.
  - `react-router-dom`: Routing used for the `/login/callback` handler.
  - `react`, `react-dom`, `react-scripts`, `typescript`: React app runtime/build.

## Step-by-step setup (detailed, with package context)

1) Register an OIDC application in Okta
   - This provides the values consumed by `@okta/okta-auth-js` and
     `@okta/okta-react` in `src/OktaAppConfig.ts`.
   - Create a new OIDC app (SPA for browser-only apps, web app if you have a server).
   - Configure the redirect URI to match your local dev URL:
     - Example: `http://localhost:3000/login/callback`
   - Ensure PKCE is enabled for SPA flows.
   - Note the following values:
     - Client ID
     - Issuer value of the JWT
     - Redirect URI

2) Provide backend requirements to the hosting team
   - The backend validates tokens issued by your OIDC provider.
   - Send the Issuer and JWKS URL to the backend hosting team.
     - Okta JWKS URL is typically: `<issuer>/v1/keys`
   - They will return the value for `MARVIN_WEBSERVICES_HOST`, which points to
     the remote Marvin web services deployment.

3) Configure Okta in the front end
   - `@okta/okta-auth-js` and `@okta/okta-react` use these values to manage login.
   - Open `src/OktaAppConfig.ts` and update:
     - `issuer` with your Okta issuer
     - `clientId` with your Okta client ID
     - `redirectUri` to match your app URL

4) Configure Marvin initialization and JWT
   - Set `MARVIN_WEBSERVICES_HOST` in `src/OktaAppConfig.ts` to the value from
     the hosting team; Marvin uses this host to route webservice calls.
   - Initialize Marvin in `src/OktaMarvin.tsx` with:
     - `getDefaultSettings(MARVIN_WEBSERVICES_HOST)` to create settings.
     - `webServiceSettings.getJWT` to return the current access token so Marvin
       can send `Authorization: Bearer <token>` on backend requests.

5) Install dependencies
   - This brings in Marvin, Okta SDKs, and React tooling declared in `package.json`.

```
npm install
```

6) Run the app

```
npm start
```

7) Verify the flow
   - Open `http://localhost:3000`.
   - Click Login to redirect to Okta.
   - After returning to `/login/callback`, Marvin loads and can call the backend.
   - The access token is supplied via `getJWT` in `src/OktaMarvin.tsx`.

## Configuration locations

- Okta config is defined in `src/OktaAppConfig.ts`.
- The example app entry is in `src/OktaApp.tsx` and `src/OktaMarvin.tsx`.

## Marvin-related code explanation

- `src/OktaMarvin.tsx` is the main integration point for Marvin:
  - `getDefaultSettings(MARVIN_WEBSERVICES_HOST)` creates a Marvin settings
    object and points it to the remote backend host.
  - `marvinSettings.webServiceSettings.getJWT` is set to return the current OIDC
    access token, which Marvin uses as a Bearer token on backend requests.
  - `<ReactMarvin settings={marvinSettings} />` embeds the Marvin UI in the page.
  - `onReady` and `onError` are simple hooks to log startup and failures.

- `src/OktaApp.tsx` handles routing and Okta session wiring:
  - `Security` wraps the app and provides Okta auth state to the component tree.
  - The `/login/callback` route handles the OIDC redirect completion.

## Backend access requirements

All requests to the remote backend must include a valid OIDC access token.
Ensure the access token is sent in the `Authorization` header as a Bearer token
when the `marvin-react` client talks to the backend.

Example header:

```
Authorization: Bearer <access_token>
```

## Notes

- Any OIDC provider can be used as long as it provides an Issuer and JWKS URL.
  - These are necessary to validate a JWT according to https://developer.okta.com/docs/guides/validate-access-tokens/go/main/#what-to-check-when-validating-an-access-token 
- The redirect URI must match the one configured in your OIDC client.

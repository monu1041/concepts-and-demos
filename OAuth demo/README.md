# OAuth Demo

A minimal OAuth-like demo application using Node.js, Express, JWT, and Axios.

This repository contains two servers:

- `oauth-server.js`: A mock OAuth authorization server that issues authorization codes and exchanges them for JWT access tokens.
- `client-app.js`: A client application that starts the authorization flow, receives the authorization code, requests a token, and then requests a protected profile endpoint.

> This is a demo implementation for learning OAuth authorization code flow behavior. It is not production-ready.

## Features

- `GET /authorize` issues an authorization code and redirects back to the client callback.
- `POST /token` accepts an authorization code and returns a signed JWT access token.
- `GET /profile` validates the JWT access token and returns user profile data.
- Client app uses Axios to call the token endpoint and protected profile endpoint.

## Prerequisites

- Node.js 18+ installed
- npm available

## Install Dependencies

From the repository root, run:

```bash
npm install
```

This installs:

- `express` for web servers
- `axios` for HTTP requests from the client app
- `jsonwebtoken` for signing and verifying JWT tokens

## Run the Demo

Open two terminals in the project folder.

### Start the OAuth server

```bash
node oauth-server.js
```

The server will listen on `http://localhost:4000`.

### Start the client app

```bash
node client-app.js
```

The client app will listen on `http://localhost:3000`.

## Demo Flow

1. Open `http://localhost:3000` in a browser.
2. Click the **Login** link to start the authorization flow.
3. The browser is redirected to the OAuth server's `/authorize` endpoint.
4. The OAuth server generates an authorization code and redirects back to `http://localhost:3000/callback?code=...`.
5. The client app receives the authorization code and calls `POST http://localhost:4000/token`.
6. The OAuth server validates the code and returns a JWT access token.
7. The client stores the token in memory and can call `/profile` to fetch protected user data.

## Endpoints

### OAuth Server

- `GET /authorize`
  - Generates an authorization code and redirects to the client callback.
- `POST /token`
  - Request body: `{ code: string }`
  - Returns: `{ access_token: string }`
- `GET /profile`
  - Requires `Authorization: Bearer <token>` header
  - Returns the decoded JWT payload on success.

### Client App

- `GET /`
  - Shows login and profile links.
- `GET /callback`
  - Receives the authorization code and requests an access token.
- `GET /profile`
  - Uses the stored JWT to call the OAuth server's protected profile endpoint.

## How It Works

- The authorization server keeps authorization codes in memory using a `Map`.
- A valid authorization code can be exchanged only once for a JWT.
- The JWT is signed with the hard-coded secret `oauth_secret` and expires after 15 minutes.
- Token verification occurs in the OAuth server's `/profile` endpoint.

## Notes

- The authorization code store is in-memory and clears on server restart.
- The client stores the access token in memory, so refreshing the browser or restarting the client loses the session.
- This app does not include refresh tokens, state parameters, PKCE, or full OAuth security controls.

## Troubleshooting

- If the browser shows `Login first`, the client has not yet received a valid access token.
- If the OAuth server returns `Invalid token`, the JWT is missing, expired, or malformed.
- Make sure both servers are running and using the correct ports:
  - Client: `3000`
  - OAuth server: `4000`

## License

This demo is provided as-is for educational purposes.

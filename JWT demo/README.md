# JWT Authentication Demo

A simple Express.js application demonstrating JWT (JSON Web Token) authentication and authorization. This project showcases how to generate, verify, and use JWT tokens for securing API endpoints.

## Features

- **Token Generation**: POST endpoint to generate JWT tokens with user data
- **Token Verification**: GET endpoint to verify JWT tokens and retrieve user information
- **Expiration Handling**: Tokens expire after 1 hour
- **Authorization Header**: Demonstrates Bearer token authentication pattern

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "JWT demo"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```
JWT demo/
├── index.js          # Main Express application
├── package.json      # Project dependencies and metadata
├── request.http      # HTTP requests for testing
└── README.md         # This file
```

## How to Run

1. Start the server:
   ```bash
   node index.js
   ```

2. You should see the output:
   ```
   Running on port 3000
   ```

The server will be available at `http://localhost:3000`

## API Endpoints

### 1. Login Endpoint
- **URL**: `POST http://localhost:3000/login`
- **Description**: Generates a JWT token for a user
- **Response**: JSON object containing the JWT token
- **Response Example**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 2. Profile Endpoint
- **URL**: `GET http://localhost:3000/profile`
- **Description**: Retrieves user profile by verifying the JWT token
- **Authentication**: Requires `Authorization: Bearer <token>` header
- **Response**: Decoded JWT payload containing user data
- **Response Example**:
  ```json
  {
    "id": 1,
    "name": "John",
    "role": "admin",
    "moreData": "This is some additional data that will be included in the JWT payload",
    "iat": 1234567890,
    "exp": 1234571490
  }
  ```

## How to Use the request.http File

The `request.http` file contains example requests for testing the API. You can use it with different tools:

### Option 1: VS Code REST Client Extension (Recommended)

1. Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code
2. Open `request.http` file in VS Code
3. Click on **Send Request** button above each request or use keyboard shortcut

**How to test the full flow:**
1. Send the `POST /login` request
2. Copy the token from the response
3. In the second request, replace `TOKEN_HERE` with the actual token
4. Send the `GET /profile` request with the Bearer token

### Option 2: Using cURL (Command Line)

**Step 1: Get a token**
```bash
curl -X POST http://localhost:3000/login
```

**Output:**
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

**Step 2: Use the token to access the profile**
```bash
curl http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Replace the token with the one from Step 1.

### Option 3: Using Postman

1. **Create Login Request:**
   - Method: `POST`
   - URL: `http://localhost:3000/login`
   - Click **Send**
   - Copy the token from the response

2. **Create Profile Request:**
   - Method: `GET`
   - URL: `http://localhost:3000/profile`
   - Headers tab: Add `Authorization` key with value `Bearer <token>`
   - Click **Send**

### Option 4: Using Thunder Client (VS Code Extension)

1. Install [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
2. Create new requests with the same endpoints and headers as above

## Complete Example Workflow

**Terminal 1: Start the server**
```bash
node index.js
```

**Terminal 2: Test the API (using cURL)**

```bash
# Step 1: Login and get token
curl -X POST http://localhost:3000/login

# Output:
# {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJtb3JlRGF0YSI6IlRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGRhdGEgdGhhdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSBKV1QgcGF5bG9hZCIsImlhdCI6MTcxMjM0NTY3OCwiZXhwIjoxNzEyMzQ5Mjc4fQ.abcdef123456..."}

# Step 2: Use the token to access profile
curl http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4iLCJtb3JlRGF0YSI6IlRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGRhdGEgdGhhdCB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSBKV1QgcGF5bG9hZCIsImlhdCI6MTcxMjM0NTY3OCwiZXhwIjoxNzEyMzQ5Mjc4fQ.abcdef123456..."

# Output:
# {"id":1,"name":"John","role":"admin","moreData":"This is some additional data that will be included in the JWT payload","iat":1712345678,"exp":1712349278}
```

## Token Information

- **Expiration**: 1 hour (3600 seconds)
- **Secret Key**: `super_secret_key` (used for signing/verification)
- **Algorithm**: HS256 (HMAC with SHA-256)

**Note**: In a production environment, the secret key should be stored securely in environment variables, not hardcoded.

## Dependencies

- **express** (^5.2.1): Web framework for Node.js
- **jsonwebtoken** (^9.0.3): JWT token generation and verification

## Error Handling

### Missing Token
- **Status Code**: 401 Unauthorized
- **Response**: `{"message":"No token"}`

### Invalid or Expired Token
- **Status Code**: 401 Unauthorized
- **Response**: `{"message":"Invalid token"}`

## Learning Objectives

This demo helps you understand:
- ✅ How to generate JWT tokens
- ✅ How to verify JWT tokens
- ✅ Bearer token authentication pattern
- ✅ JWT payload structure (claims)
- ✅ Token expiration
- ✅ Protected endpoints

## Resources

- [JWT Documentation](https://jwt.io)
- [jsonwebtoken npm package](https://www.npmjs.com/package/jsonwebtoken)
- [Express.js Documentation](https://expressjs.com)
- [REST API Best Practices](https://restfulapi.net/authentication-methods)

## License

ISC

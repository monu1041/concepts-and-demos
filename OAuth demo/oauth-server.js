const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();

const SECRET = "oauth_secret";
const authCodes = new Map();

app.use(express.json());

app.get("/authorize", (req, res) => {
  const code = crypto.randomBytes(8).toString("hex");

  authCodes.set(code, {
    userId: 1,
    name: "John"
  });

  console.log("\n[OAuth Server]");
  console.log("Generated Authorization Code:", code);

  res.redirect(
    `http://localhost:3000/callback?code=${code}`
  );
});

app.post("/token", (req, res) => {
  const { code } = req.body;

  console.log("\n[OAuth Server]");
  console.log("Received Code:", code);

  if (!authCodes.has(code)) {
    return res.status(400).json({
      error: "invalid_code"
    });
  }

  const user = authCodes.get(code);

  const accessToken = jwt.sign(
    user,
    SECRET,
    { expiresIn: "15m" }
  );

  console.log("Generated JWT:");
  console.log(accessToken);

  authCodes.delete(code);

  res.json({
    access_token: accessToken
  });
});

app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send("No token");
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    console.log("\n[OAuth Server]");
    console.log("Verified JWT:");
    console.log(decoded);

    res.json(decoded);
  } catch {
    res.status(401).send("Invalid token");
  }
});

app.listen(4000, () => {
  console.log("OAuth Server running on 4000");
});
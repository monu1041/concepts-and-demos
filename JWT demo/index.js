const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET = "super_secret_key";

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "John",
    role: "admin",
    moreData: "This is some additional data that will be included in the JWT payload"
  };

  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h"
  });

  console.log("Generated JWT:");
  console.log(token);

  res.json({ token });
});

app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "No token"
    });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    console.log("Decoded JWT:");
    console.log(decoded);

    res.json(decoded);
  } catch {
    res.status(401).json({
      message: "Invalid token"
    });
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
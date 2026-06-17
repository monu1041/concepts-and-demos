const express = require("express");
const axios = require("axios");

const app = express();

let accessToken = null;

app.get("/", (req, res) => {
  res.send(`
    <h2>Mini OAuth Demo</h2>

    <a href="http://localhost:4000/authorize">
      Login
    </a>

    <br/><br/>

    <a href="/profile">
      Get Profile
    </a>
  `);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  console.log("\n[Client]");
  console.log("Received Authorization Code:");
  console.log(code);

  const response = await axios.post(
    "http://localhost:4000/token",
    { code }
  );

  accessToken = response.data.access_token;

  console.log("\n[Client]");
  console.log("Received JWT:");
  console.log(accessToken);

  res.send(`
    Login Success!
    <br/>
    Check your terminal.
    <br/><br/>
    <a href="/profile">Get Profile</a>
  `);
});

app.get("/profile", async (req, res) => {
  if (!accessToken) {
    return res.send("Login first");
  }

  const response = await axios.get(
    "http://localhost:4000/profile",
    {
      headers: {
        Authorization:
          `Bearer ${accessToken}`
      }
    }
  );

  console.log("\n[Client]");
  console.log("Profile Response:");
  console.log(response.data);

  res.json(response.data);
});

app.listen(3000, () => {
  console.log("Client running on 3000");
});
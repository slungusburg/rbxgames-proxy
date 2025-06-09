const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/stats", async (req, res) => {
  const universeId = req.query.universeId;
  if (!universeId) return res.status(400).json({ error: "Missing universeId" });

  try {
    const response = await axios.get(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Roblox API" });
  }
});

app.get("/", (req, res) => {
  res.send("Roblox Proxy is running.");
});

app.listen(port, () => {
  console.log(`Proxy is live on port ${port}`);
});

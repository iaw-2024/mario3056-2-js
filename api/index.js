const express = require("express");
const app = express();
const fs = require("fs").promises;
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/data.json');

app.get("/express", (req, res) => res.send("Express on Vercel!"));

app.get("/data", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
app.use(express.static("public"));

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
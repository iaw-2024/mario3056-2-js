const express = require("express");
const app = express();
const fs = require("fs").promises;
const path = require('path');
//const dataPath = './data/data.json';
const dataFilePath = path.join(__dirname, '../data/data.json');

/*
app.get("/express", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
    } else {
      res.json(JSON.parse(data));
    }
  });
});
*/

// Define a route to serve the JSON file
app.get('/express', async (req, res) => {
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//app.get("/cliente_servidor", (req, res) => res.send("Cliente Servidor on Vercel!"));
app.use(express.static("public"));


app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
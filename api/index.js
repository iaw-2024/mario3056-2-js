const express = require("express");
const app = express();
const fs = require("fs");
const dataPath = './data/data.json';

app.get("/express", (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});
//app.get("/cliente_servidor", (req, res) => res.send("Cliente Servidor on Vercel!"));
app.use(express.static('public'))


app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
const express = require("express");
const app = express();
const fs = require("fs").promises;
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/data.json");

app.get("/express", (req, res) => {
  var data = require(dataFilePath);

  let html = `
    <!doctype html>
    <html lang="en"
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>listado-express</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head
    <body>
        <div class="container text-center">
            <h1>Listado</h1>
            <br>
        </div>
        <div class="container table-responsive text-nowrap">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Credit Card</th>
                    </tr>
                </thead>
                <tbody id="table-body" class="table-group-divider">
    `;
  
  data.forEach(item => {
    html += `
      <tr>
        <th scope="row">${item.id}</th>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.email}</td>
        <td>${item.birthdate}</td>
        <td>${item.credit_card}</td>
      </tr>
    `;
  });
  
  html += `
          </tbody>
        </table>
      </div
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"></script>
    </body
    </html>
  `
  res.setHeader("Content-Type", "text/html")
  res.send(html);
});

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

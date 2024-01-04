const express = require("express");
const { engine } = require("express-handlebars");
const axios = require("axios");

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3001/api/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

app.get("/", async (req, res) => {
  const data = await fetchData();
  res.render("home", { items: data.items });
});

app.listen(port, () => {
  console.log(`Frontend app running at http://localhost:${port}`);
});

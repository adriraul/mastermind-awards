const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

const friendsDataPath = path.join(__dirname, "../src/friendsData.json");

app.get("/friends", (req, res) => {
  try {
    const data = fs.readFileSync(friendsDataPath, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

app.post("/friends", (req, res) => {
  const newData = req.body;

  try {
    const json = JSON.stringify(newData, null, 2);
    fs.writeFileSync(friendsDataPath, json, "utf8");
    console.log("Datos guardados con éxito.");
    res.json({ success: true });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res
      .status(500)
      .json({ success: false, error: "Error al guardar los datos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

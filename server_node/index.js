
const express = require("express");
const cors = require("cors");
const { translate } = require("./models/api");
const { Translator } = require("./models/Translator");

const app = express();
const port = 3000

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173"
}))

app.get("/", (req, res) => {
  res.send("Olá")
})

app.post("/translate", async (req, res) => {
  const textENG = req.body["text"];

  const textPTBR = await translate(textENG)
  res.send(textPTBR)
})

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Substitua com sua string de conexão do MongoDB Atlas
const mongoURI = "mongodb+srv://thulio:admin@cluster0.hmnh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const QRCodeSchema = new mongoose.Schema({
  codigo: String,
  descricao: String,
  quantidade: Number,
  localizacao: String,
  dataRecebimento: String,
  lote: String
});


const QRCodeData = mongoose.model("QRCodeData", QRCodeSchema);

app.post("/api/qrcodes", async (req, res) => {
  try {
    const newQRCode = new QRCodeData(req.body);
    await newQRCode.save();
    res.status(200).json({ message: "Dados do QR Code salvos com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar os dados", error });
  }
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});

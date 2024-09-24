const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Usar a variável de ambiente MONGO_URI no Heroku, ou usar uma string local se não estiver definida
const mongoURI = process.env.MONGO_URI || "mongodb+srv://thulio:admin@cluster0.hmnh1.mongodb.net/TICKETMASTER?retryWrites=true&w=majority";

// Conectar-se ao MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB conectado com sucesso!"))
.catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Definir o esquema do QRCode
const QRCodeSchema = new mongoose.Schema({
  codigo: String,
  descricao: String,
  quantidade: Number,
  localizacao: String,
  dataRecebimento: String,
  lote: String
});

const QRCodeData = mongoose.model("QRCodeData", QRCodeSchema);

// Capturar o POST que será enviado pelo QRscanner
app.post("/", async (req, res) => {
  try {
    const newQRCode = new QRCodeData(req.body);  // Captura os dados do request
    await newQRCode.save();  // Salva no MongoDB
    res.status(200).json({ message: "Dados do QR Code salvos com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar os dados", error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

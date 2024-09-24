import React, { useState } from "react";
import { Fab, TextField } from "@material-ui/core";
import QrScan from "react-qr-reader";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";

function QRscanner() {
  const [qrscan, setQrscan] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
      alert(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleChange = (event) => {
    setQrscan(event.target.value);
  };

  function getValue(string, j) {
    return string.split(/[}|{]+/)[j];
  }

  var resposta = new Array(8);
  for (var t = 0; t < 8; t++) {
    resposta[t] = getValue(qrscan, t);
  }
  for (var o = 0; o < 8; o++) {
    if (resposta[o] === undefined) {
      resposta[o] = "...";
    }
  }

  var quantrest = resposta[4];
  if (quantrest.includes(".") === false && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
  } else if (quantrest.includes(".") && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
    quantrest = quantrest.replace(".", "");
  }

  const handleClick = async () => {
    try {
      const pacote = parseInt(window.prompt("Digite a quantidade de pacotes: "), 10);
      if (isNaN(pacote) || pacote <= 0) {
        alert("Quantidade de pacotes inválida!");
        return;
      }

      alert("VERIFIQUE se a quantidade de pacotes está correta: " + pacote);

      // Organizando os dados do QR code para envio
      const qrData = {
        codigo: resposta[0],           // Código único do QR
        descricao: resposta[1],        // Descrição do item
        quantidade: pacote,            // Quantidade de pacotes
        localizacao: resposta[6],      // Localização do item
        dataRecebimento: new Date().toLocaleDateString(),
        lote: resposta[5],             // Lote do produto
        detalhes: {                    // Informações adicionais
          unidade: resposta[2],
          oc: resposta[3],
          fabricante: resposta[4],
          dataLote: resposta[7]
        }
      };

      // Enviando os dados para o backend hospedado no Heroku
      const response = await fetch("https://polar-island-40233.herokuapp.com/api/qrcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(qrData)
      });

      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>QR Scanner</span>
      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 200, width: 200 }}
          />
        </div>
      </center>
      <center>
        <TextField
          label="Código escaneado: "
          variant="filled"
          style={{ fontSize: 17, width: 220, height: 100, marginTop: 20 }}
          maxRows={4}
          value={qrscan}
          onChange={handleChange}
          helperText="Clique aqui e escaneie"
        />
      </center>
      <div>
        <center>
          <div>
            <QRCode id="myqr" value={qrscan} size={75} includeMargin={false} />
          </div>
        </center>
        <center>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={handleClick}
          >
            Salvar etiqueta(s)
          </Fab>
        </center>
      </div>
    </div>
  );
}

export default QRscanner;

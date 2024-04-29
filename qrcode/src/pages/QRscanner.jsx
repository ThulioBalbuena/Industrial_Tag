// QRscanner.jsx
import React, { useState } from "react";
import { Fab, TextField } from "@material-ui/core";
import QrScan from "react-qr-reader";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QRcode from "qrcode.react";
import generatePDF from "./EtiquetaModel";

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

  const handleClick = () => {
    var pacote = window.prompt("Digite a quantidade de pacotes: ");
    alert("VERIFIQUE se a quantidade de pacotes está correta: " + pacote);
    var nome = 0;
    const date = new Date().toLocaleDateString();
    var check;
    console.log(quantrest);
    var auxx = 0;
    var ajuda = quantrest / pacote;
    var valor;
    var lote, fab;

    for (var i = 0; i < pacote; i++) {
      if (quantrest !== 0) {
        nome++;
        if (i === 0) {
          alert("Insira valores com decimais primeiro.");
          fab = window.prompt("Digite o fabricante: ");
          lote = window.prompt("Digite o FAB/EMB: ");
        }
        if (quantrest % pacote === 0 && i === 0) {
          alert(
            "ATENÇÃO: Se todos os pacotes forem iguais, o valor inserido deverá ser de " +
              ajuda
          );
        }
        valor = window.prompt("Digite o valor do pacote " + nome + ": ");
        check = window.prompt("Quantos pacotes contém o esse mesmo valor? ");
        check = Number(check);
        valor = valor.replace(",", ".");
        valor = Number(valor);
        while (valor > quantrest || valor <= 0 || isNaN(valor)) {
          console.log("entrei no while");
          valor = window.prompt(
            "Valor incoerente com o valor total do produto, digite novamente (valor restante: " +
              quantrest +
              "): "
          );
          valor = valor.replace(",", ".");
          check = window.prompt(
            "Quantos pacotes contém o esse mesmo valor? "
          );
          check = Number(check);
          valor = Number(valor);
        }
        console.log(valor);
        quantrest = Math.round(quantrest - valor * check).toFixed(2);
        quantrest = Number(quantrest);
        console.log(quantrest);
        if (quantrest < 0) {
          alert("Erro: Valor total do produto ultrapassado");
          window.location.reload();
        }
        valor = valor.toString();
        valor = valor.replace(".", ",");

        for (var j = 0; j < check; j++) {
          auxx++;
          generatePDF(qrscan, pacote, auxx, valor, fab, lote, date);
        }
      } else if (quantrest === 0 || quantrest < 0) {
        alert(
          "Erro ao gerar pdfs: Quantidade de pacotes não confere com a quantidade de itens!"
        );
        window.location.reload();
        break; // Saia do loop se houver um erro
      }
    }
  };
  alert("Pdfs gerados com sucesso!");

  function getValue(string, j) {
    return string.split(/[}|{]+/)[j];
  }

  var resposta = new Array(7);
  for (var t = 0; t < 8; t++) {
    resposta[t] = getValue(qrscan, t);
  }
  for (var o = 0; o < 8; o++) {
    if (resposta[o] === undefined) {
      resposta[o] = "...";
    }
  }

  var quantrest = resposta[4];
  console.log(quantrest);

  if (quantrest.includes(".") === false && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
    console.log("oie");
  } else if (quantrest.includes(".") && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
    quantrest = quantrest.replace(".", "");
    console.log("tchau");
  }
  console.log(quantrest);

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
            <QRcode id="myqr" value={qrscan} size={75} includeMargin={false} />
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

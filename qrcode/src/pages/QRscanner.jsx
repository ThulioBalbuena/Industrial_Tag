import React, { useState } from "react";
import { Fab, TextField } from "@material-ui/core";
import QrScan from "react-qr-reader";
import jsPDF from "jspdf";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QRcode from "qrcode.react";

function QRscanner() {
  var [qrscan, setQrscan] = useState(
    ""
  );
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
      alert(data);
    }
    return data;
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

  var resposta = new Array(7);
  for (var t = 0; t < 8; t++) {
    resposta[t] = getValue(qrscan, t);
  }
  for (var o = 0; o < 8; o++) {
    if (resposta[o] === undefined) {
      resposta[o] = "...";
    }
  } 
  //teste
  //testando o commit
  var quantrest = resposta[4];
  console.log(quantrest); 
  if(quantrest.includes(".") === false && quantrest.includes(",")){
    quantrest = quantrest.replace(",",".");
    console.log("oie");
  }else if(quantrest.includes(".") && quantrest.includes(",")){
  quantrest = quantrest.replace(",", ".");
  quantrest = quantrest.replace(".", "");
  console.log("tchau");
  }
  console.log(quantrest)
  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary" >
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
        <Fab variant="extended" color="primary" aria-label="add"
          onClick={() => {
            var pacote = window.prompt("Digite a quantidade de pacotes: ");
            alert("VERIFIQUE se a quantidade de pacotes está correta: " + pacote);
            var nome = 0;
            const date = new Date().toLocaleDateString();
            var check;
            console.log(quantrest)
            var auxx = 0;
            var ajuda = quantrest/pacote;
            var valor;
            var lote,fab;
            for (var i = 0; i < pacote; i++){
              if(quantrest !== 0){
              nome++;
              if(i===0){
                alert("Insira valores com decimais primeiro.");
                fab = window.prompt("Digite o fabricante: ");
                lote = window.prompt("Digite o FAB/EMB: ");
              }
              if( quantrest%pacote === 0 && i === 0){
                alert("ATENÇÃO: Se todos os pacotes forem iguais, o valor inserido deverá ser de " + ajuda);
              }
                valor = window.prompt("Digite o valor do pacote " + nome + ": ");
                check = window.prompt("Quantos pacotes contém o esse mesmo valor? ");
                check = Number(check);
                valor = valor.replace(',', '.');
                valor = Number(valor);
                while(valor > quantrest || valor <= 0 || isNaN(valor)){
                  console.log("entrei no while")
                  valor = window.prompt("Valor incoerente com o valor total do produto, digite novamente (valor restante: " + quantrest + "): ");
                  valor = valor.replace(',', '.');
                  check = window.prompt("Quantos pacotes contém o esse mesmo valor? ");
                  check = Number(check);
                  valor = Number(valor);
                }
                console.log(valor)
                quantrest = Math.round(quantrest - (valor*check)).toFixed(2);
                quantrest = Number(quantrest);
                console.log(quantrest)
                if(quantrest < 0){
                  alert("Erro: Valor total do produto ultrapassado");
                  window.location.reload();
                }
              valor = valor.toString();
              valor = valor.replace('.', ',');
            if(i === 0){
                var doc = new jsPDF({
                  orientation: "landscape",
                  unit: "mm",
                  format:[100,40],
                });
            }
            for(var j = 0; j < check; j++){
            auxx++;
            doc.setLineWidth(1);
            doc.rect(3, 3, 95, 35, "S");
            //vertical 
            doc.setLineWidth(0.5);
            doc.setFontSize(8.5);
            doc.setFont('helvetica');
            doc.setFont(undefined, 'bold')
            //doc.text(7,7, "HITACHI KOKUSAI LINEAR                          ITEM CONFORME");
            doc.text(7,7, "Vanessa e companhia");
              doc.setLineWidth(0.5);
              doc.setFontSize(7);
              doc.text(4, 19, "DESCRIÇÃO:");
              doc.setFontSize(7);
              doc.text(resposta[0], 21, 19);
              doc.setLineWidth(0.5);
              doc.line(98, 15,58, 15);
              doc.line(77,29,3, 29);
              //LINHA DO MEIO
              doc.line(43, 38, 43, 29);
              doc.line(58, 3,58,15);
              doc.line(77, 20, 77, 38);
              doc.line(77, 20, 98,20);
              doc.setFontSize(7);
              doc.text(4, 15, "LOCALIZAÇÃO:");
              doc.setFontSize(8);
              doc.text(resposta[6], 24, 15);
              doc.setFontSize(8);
              doc.text(31, 32, "Pacote:");
              doc.setLineWidth(0.5);
              doc.setFontSize(6.5)
              doc.text(60,10, '"Usar peças antigas primeiro"');
              doc.setFontSize(8);
              doc.text(resposta[7], 16, 11.5);
              doc.line(59,29, 59 , 38); 
              doc.setFontSize(7);
              doc.text(4, 23, "PN:");
              doc.setFontSize(8);
              doc.text(resposta[1], 9, 23);
              doc.setFontSize(7);
              doc.setLineWidth(0.5);
              doc.text(4, 11.5, "CÓDIGO:");
              doc.setFontSize(8);
              doc.text('Recebido:', 60, 13.5);
              doc.text(date, 75, 13.5);
              doc.text("Grupo:", 4, 32);
              doc.text("Fab-Emb", 17, 32);
              doc.text(lote, 17,36);
              doc.setFontSize(8);
              doc.text(4,36, resposta[5]);
              doc.setFontSize(8);
              doc.text(31,36, (auxx) + ' / ' + pacote);
              doc.setFontSize(8);
              doc.text("Quantidade:", 60, 32);
              doc.setFontSize(10);
              doc.text(valor, 60,36);
              doc.setFontSize(8);
              doc.text(44, 32, "Unidade:");
              doc.setFontSize(8);
              doc.text(44,36, resposta[2]);
              doc.setFontSize(7);
              doc.text("OC:", 42, 27);
              doc.text("FORN:", 4, 27);
              doc.text(fab, 13, 27);
              doc.line(16,29, 16, 38);
              doc.line(30, 29, 30, 38);
              doc.setFontSize(8);
              doc.text(resposta[3], 48, 27);
              //rever essa parte para o caso da geração de qr code
                // var imgData = document
                // .getElementById("myqr")
                // .toDataURL("image/png");
                // doc.addImage(imgData, "PNG", 80.5 , 20.5, 22, 22);
                if(i !== (pacote - 1)){
                doc.addPage();
                }
            }
            i = i + (check - 1);
            if(quantrest === 0 && (i === (pacote - 1))){
              doc.save(resposta[7] + "/" + resposta[3] + "/" + nome + ".pdf");
              alert("Pdfs gerados com sucesso!");
              }else if(quantrest !== 0 && (i === (pacote - 1))){
                alert("Erro ao gerar pdfs: Verifique se a quantidade de peças é divisível pelo pacote!");
                i=pacote;
                window.location.reload();
              }
          } else if (quantrest === 0 || quantrest < 0){
            alert("Erro ao gerar pdfs: Quantidade de pacotes não confere com a quantidade de itens!");
            i = pacote;
            window.location.reload();
          }
        }
          }}
        >
          Salvar etiqueta(s)
        </Fab>
        </center>
      </div>
    </div>
  );
}

export default QRscanner;
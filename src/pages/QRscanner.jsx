import React, { useState } from "react";
import { Fab, TextField } from '@mui/material';
import QrReader from 'react-qr-scanner';  
import jsPDF from "jspdf";
import { ArrowBack } from '@mui/icons-material';
import { Link } from "react-router-dom";
import QRCodeCanvas from "qrcode.react";
import QRcode from "qrcode";

function QRscanner() {
  const [qrscan, setQrscan] = useState("");
  const [buttonColor, setButtonColor] = useState('#002171'); // Estado para cor do botão
  let [valorNum, setValor] = useState(null); // Estado para valor inserido
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setQrscan(data.text); 
      const qrArray = data.text.split('|');
      if (qrArray.length === 8) {
        setButtonColor('#4CAF50'); // Verde para sucesso
        setIsButtonDisabled(false); // Habilita o botão
      } else {
        setButtonColor('#f44336'); // Vermelho para erro
        setIsButtonDisabled(true); // Desabilita o botão
        alert("O QR code escaneado não representa um item real.");
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
    if (!qrscan) {  // Verifica se já houve uma tentativa de escanear
      setButtonColor('#f44336'); // Vermelho (erro) apenas se houver falha após tentativa
      setIsButtonDisabled(true);
    }
    if (err.name === "NotAllowedError") {
      alert("Permissão de câmera negada. Verifique as configurações do navegador.");
    }
  };

  const handleChange = (event) => {
    setQrscan(event.target.value);  
  };

  // Função para reiniciar os campos após erro
  const resetFields = () => {
    setValor(null);
    alert("Valores redefinidos. Insira novamente.");
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

  const sendQRCodeDataToBackend = async (qrData) => {
    console.log("Dados enviados:", qrData); // Adicione este log para depuração
    try {
      const response = await fetch("https://polar-island-40233-a2032bd06f30.herokuapp.com/api/qrcodes", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qrData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      const data = await response.json();
      alert(data.message || "Dados do QR Code salvos com sucesso!");  
    } catch (error) {
      console.error("Erro ao enviar dados para o backend Python:", error);
    }
  };

  const handleClick = () => {
    var quantrest = resposta[4];  // Resetando quantrest para o valor original
    var pacote = 0;
    var auxx = 0;
    var pacotesinseridos = 0;
    var check = 0;
    setValor(null)
    pacote = parseInt(window.prompt("Digite a quantidade de pacotes: "), 10);
    if (isNaN(pacote) || pacote <= 0) {
      alert("Quantidade de pacotes inválida!");
      return;
    }

    alert("VERIFIQUE se a quantidade de pacotes está correta: " + pacote);

    var nome = 0;
    const date = new Date().toLocaleDateString();
    var ajuda = quantrest / pacote;
    var lote, fab;

    // Organizando os dados para enviar ao MongoDB
    const qrData = {
      descricao: resposta[0], 
      codigo: resposta[1],    
      quantidade: resposta[4],
      localizacao: resposta[6],
      dataRecebimento: date,
      lote: resposta[5],
    };
    
    var doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [100, 40],
    });

    doc.deletePage(1);

    for (var i = 0; i < pacote; i++) {
      if (quantrest > 0) {
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

        if(quantrest === 0){
          return;
        } else {
          valorNum = parseFloat(window.prompt("Digite o valor do pacote " + nome + ": ")); // Tratando como número
        }

        check = parseInt(window.prompt("Quantos pacotes contêm esse mesmo valor? "), 10);
        if (isNaN(check) || check <= 0) {
          alert("Quantidade de pacotes inválida!");
          return;
        }

        // Converter para string para usar .replace()
        let valorStr = valorNum.toString().replace(",", "."); 

        pacotesinseridos = pacotesinseridos + check;
        if (pacotesinseridos > pacote) {
          alert("Erro: A quantidade de pacotes inseridos excede o total de pacotes inseridos.");
          return;
        }

        while (valorNum > quantrest || valorNum <= 0 || isNaN(valorNum)) {
          valorNum = parseFloat(
            window.prompt(
              "Valor incoerente com o valor total do produto, digite novamente (valor restante: " +
                quantrest +
                "): "
            ).replace(",", ".")
          );
          check = parseInt(window.prompt("Quantos pacotes contêm esse mesmo valor? "), 10);
          if (isNaN(check) || check <= 0) {
            alert("Quantidade de pacotes inválida!");
            return;
          }
        }

        quantrest = parseFloat((quantrest - valorNum * check).toFixed(2));

        if (quantrest < 0) {
          alert("Erro: Valor total do produto ultrapassado. Verifique os valores.");
          return;
        }

        valorStr = valorNum.toString().replace(".", ",");

        for (var j = 0; j < check; j++) {
          auxx++;
          doc.addPage();

          // Gerar o PDF do pacote
          doc.setLineWidth(1);
          doc.rect(3, 3, 95, 35, "S");

          doc.setLineWidth(0.5);
          doc.setFontSize(8.5);
          doc.setFont("helvetica");
          doc.setFont(undefined, "bold");
          doc.text(7, 7, "Thulio LTDA - 2024");     
          doc.setLineWidth(0.5);
          doc.setFontSize(7);         
          doc.text(4, 19, "DESCRIÇÃO:");
          doc.text(resposta[0], 21, 19);           
          doc.line(98, 15, 58, 15);
          doc.line(77, 29, 3, 29);
          doc.line(43, 38, 43, 29);
          doc.line(58, 3, 58, 15);
          doc.line(77, 20, 77, 38);
          doc.line(77, 20, 98, 20);      
          doc.text(4, 15, "LOCALIZAÇÃO:");
          doc.text(resposta[6], 24, 15);          
          doc.text(31, 32, "Pacote:");
          doc.setFontSize(6.5);
          doc.text(60, 10, '"Usar peças antigas primeiro"');
          doc.line(59, 29, 59, 38);        
          doc.text(4, 23, "PN:");
          doc.text(resposta[7], 9, 23);            
          doc.text(4, 11.5, "CÓDIGO:");
          doc.text(resposta[1], 15, 11.5);          
          doc.text("Recebido:", 60, 13.5);
          doc.text(date, 75, 13.5);         
          doc.text("Grupo:", 4, 32);
          doc.text("Fab-Emb", 17, 32);
          doc.text(lote, 17, 36);
          doc.text(resposta[5], 4, 36);       
          doc.text(31, 36, auxx + " / " + pacote);         
          doc.text("Quantidade:", 60, 32);
          doc.setFontSize(10);
          doc.text(valorStr, 60, 36);  // Usar valor como string       
          doc.setFontSize(8);
          doc.text(44, 32, "Unidade:");
          doc.text(44, 36, resposta[2]);          
          doc.text("OC:", 42, 27);
          doc.text("FORN:", 4, 27);
          doc.text(fab, 13, 27);
          doc.line(16, 29, 16, 38);
          doc.line(30, 29, 30, 38);
          doc.text(resposta[3], 48, 27);

          var qrElementArray = [...resposta]; 
          qrElementArray[4] = valorStr; // Usar como string
          var qrElement = qrElementArray.join('|');

          if (qrElement) {
            let canvas = document.createElement('canvas');
            
            QRcode.toCanvas(canvas, qrElement, { errorCorrectionLevel: "H" }, function (error) {
              if (error) {
                console.error(error);
                return;
              }
            
              var qrImageData = canvas.toDataURL("image/png");
            
              doc.addImage(qrImageData, "PNG", 80,20.5, 17, 17);
            });
          }
        }
      }
    }

    if (quantrest === 0 && pacotesinseridos === pacote) {
      doc.save(resposta[7] + "/" + resposta[3] + "/" + nome + ".pdf");
      sendQRCodeDataToBackend(qrData);
      alert("Pdfs gerados com sucesso!");
    } else {
      alert(
        "Erro ao gerar pdfs: Verifique se a quantidade de peças é divisível pelo pacote!"
      );
      resetFields();  // Reseta campos ao final se erro ocorrer
    }
  };

  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} sx={{ backgroundColor: '#002171' }}
        color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>QR Scanner</span>
      <center>
        <div style={{ marginTop: 30 }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 200, width: 200 }}
            legacymode={true}
            constraints={{
              video: { facingMode: { exact: "environment" } } 
            }}
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
          helperText="Lembre se de salvar após o scan"
        />
      </center>
      <div>
        <center>
          <div>
            <QRCodeCanvas id="myqr" value={qrscan} size={75} includeMargin={false} />
          </div>
        </center>
        <center>
          <Fab
            variant="extended"
            sx={{ 
              backgroundColor: buttonColor,
              opacity: isButtonDisabled ? 0.5 : 1, // Transparência quando desabilitado
              pointerEvents: isButtonDisabled ? 'none' : 'auto' // Desabilita o clique
            }}
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

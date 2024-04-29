// EtiquetaModel.jsx
import jsPDF from "jspdf";

function generatePDF(qrscan, pacote, auxx, valor, fab, lote, date, nome) {
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

  if (quantrest.includes(".") === false && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
  } else if (quantrest.includes(".") && quantrest.includes(",")) {
    quantrest = quantrest.replace(",", ".");
    quantrest = quantrest.replace(".", "");
  }

  var doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [100, 40],
  });
  doc.setLineWidth(1);
  doc.rect(3, 3, 95, 35, "S");
  //vertical
  doc.setLineWidth(0.5);
  doc.setFontSize(8.5);
  doc.setFont("helvetica");
  doc.setFont(undefined, "bold");
  doc.text(7, 7, "Thulio LTDA - 2024");
  doc.setLineWidth(0.5);
  doc.setFontSize(7);
  doc.text(4, 19, "DESCRIÇÃO:");
  doc.setFontSize(7);
  doc.text(resposta[0], 21, 19);
  doc.setLineWidth(0.5);
  doc.line(98, 15, 58, 15);
  doc.line(77, 29, 3, 29);
  //LINHA DO MEIO
  doc.line(43, 38, 43, 29);
  doc.line(58, 3, 58, 15);
  doc.line(77, 20, 77, 38);
  doc.line(77, 20, 98, 20);
  doc.setFontSize(7);
  doc.text(4, 15, "LOCALIZAÇÃO:");
  doc.setFontSize(8);
  doc.text(resposta[6], 24, 15);
  doc.setFontSize(8);
  doc.text(31, 32, "Pacote:");
  doc.setLineWidth(0.5);
  doc.setFontSize(6.5);
  doc.text(60, 10, '"Usar peças antigas primeiro"');
  doc.setFontSize(8);
  doc.text(resposta[7], 16, 11.5);
  doc.line(59, 29, 59, 38);
  doc.setFontSize(7);
  doc.text(4, 23, "PN:");
  doc.setFontSize(8);
  doc.text(resposta[1], 9, 23);
  doc.setFontSize(7);
  doc.setLineWidth(0.5);
  doc.text(4, 11.5, "CÓDIGO:");
  doc.setFontSize(8);
  doc.text("Recebido:", 60, 13.5);
  doc.text(date, 75, 13.5);
  doc.text("Grupo:", 4, 32);
  doc.text("Fab-Emb", 17, 32);
  doc.text(lote, 17, 36);
  doc.setFontSize(8);
  doc.text(4, 36, resposta[5]);
  doc.setFontSize(8);
  doc.text(31, 36, auxx + " / " + pacote);
  doc.setFontSize(8);
  doc.text("Quantidade:", 60, 32);
  doc.setFontSize(10);
  doc.text(valor, 60, 36);
  doc.setFontSize(8);
  doc.text(44, 32, "Unidade:");
  doc.setFontSize(8);
  doc.text(44, 36, resposta[2]);
  doc.setFontSize(7);
  doc.text("OC:", 42, 27);
  doc.text("FORN:", 4, 27);
  doc.text(fab, 13, 27);
  doc.line(16, 29, 16, 38);
  doc.line(30, 29, 30, 38);
  doc.setFontSize(8);
  doc.text(resposta[3], 48, 27);
  // Adicionando o QR Code ao PDF
  const qrImageData = document.getElementById("myqr").toDataURL("image/png");
  doc.addImage(qrImageData, "PNG", 80.5 , 20.5, 22, 22);
 
  // Retornar a string desejada
  var pdfPath = resposta[7] + "/" + resposta[3] + "/";
  doc.save(pdfPath + nome + ".pdf");
  return pdfPath;
}

export default generatePDF;

import React, { useState } from "react";
import QrScanner from 'react-qr-scanner'; // Certifique-se de que este componente está importado corretamente
import { Link } from "react-router-dom";
import { ArrowBack, ReplayOutlined } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';

function Identifier() {
  const [data, setData] = useState("");

  // Função para capturar os dados do QR code
  const handleScan = (result) => {
    if (result) {
      setData(result); // Não use 'result.text', pois o `react-qr-scanner` retorna a string diretamente
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  // Função para dividir o QR code em partes
  function getValue(string, j) {
    return string.split(/[}_{]+/)[j];
  }

  // Inicializa com '...'
  const resposta = new Array(5).fill("...");
  for (let t = 0; t < 3; t++) {
    const value = getValue(data, t);
    resposta[t] = value !== undefined ? value : "...";
  }

  // Atualiza o estado do código escaneado
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>QR Scanner</span>
      <br />
      <br />
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan} // Use 'onScan' em vez de 'onResult' ou 'onUpdate'
        style={{ width: '100%' }}
        constraints={{
          video: { facingMode: { exact: "environment" } } // Força o uso da câmera traseira
        }}
      />
      <div>
        <TextField
          label="Código escaneado: "
          variant="filled"
          style={{ fontSize: 17, width: 220, height: 100, marginTop: 20 }}
          maxRows={4}
          value={data}
          onChange={handleChange}
          helperText="Clique aqui e escaneie"
        />
        <Fab style={{ marginLeft: 10 }} color="primary" onClick={() => setData("")}>
          <ReplayOutlined />
        </Fab>
      </div>
      <div>
        <center>
          <h7>Número de Série: </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={resposta[0]}
          />
        </center>
        <center>
          <h7>Código: </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={resposta[1]}
          />
        </center>
        <center>
          <h7>Descrição: </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={resposta[2]}
          />
        </center>
      </div>
    </>
  );
}

export default Identifier;

import React, { useState } from "react";
import QrScanner from 'react-qr-scanner'; // Certifique-se de que este componente está importado corretamente
import { Link } from "react-router-dom";
import { ArrowBack, ReplayOutlined } from '@mui/icons-material';
import { Fab, TextField } from '@mui/material';

function Identifier() {
  const [data, setData] = useState("");

  // Função para capturar os dados do QR code
  const handleScan = (result) => {
    if (result && result.text) {
      setData(result.text); // Certifique-se de acessar 'result.text' (como o `react-qr-scanner` retorna um objeto)
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.name === "NotAllowedError") {
      alert("Permissão de câmera negada. Verifique as configurações do navegador.");
    }
  };

  // Função para dividir o QR code em partes
  function getValue(string, index) {
    return string ? string.split(/[}_{]+/)[index] : "...";
  }

  // Inicializa as variáveis com valores padrão ('...')
  const pn = getValue(data, 7);       // Número de Série (PN)
  const codigo = getValue(data, 1);   // Código
  const descricao = getValue(data, 0); // Descrição

  // Atualiza o estado do código escaneado
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>QR Scanner</span>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Contêiner centralizado */}
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ height: 200, width: 200 }}  // Ajuste de tamanho para igualar o qrscanner
          legacymode={true}
          constraints={{
            video: { facingMode: { exact: "environment" } } // Força o uso da câmera traseira
          }}
        />
      </div>
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
          <h7>Número de Série (PN): </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={pn}  // Exibe o Número de Série (PN)
          />
        </center>
        <center>
          <h7>Código: </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={codigo}  // Exibe o Código
          />
        </center>
        <center>
          <h7>Descrição: </h7>
          <TextField
            style={{ fontSize: 17, width: 220, height: 100, marginTop: 5 }}
            maxRows={4}
            value={descricao}  // Exibe a Descrição
          />
        </center>
      </div>
    </div>
  );
}

export default Identifier;

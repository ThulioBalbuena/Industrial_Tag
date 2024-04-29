import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import { Fab} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import {ReplayOutlined} from '@material-ui/icons';



function App() {
  const [data, setData] = React.useState("");

  function getValue(string, j) {
    return string.split(/[}_{]+/)[j];
  }
  var resposta = new Array(5);
  for (var t = 0; t < 3; t++) {
    resposta[t] = getValue(data, t);
  }
  for (var o = 0; o < 3; o++) {
    if (resposta[o] === undefined) {
      resposta[o] = "...";
    }
  } 
  const handleChange = (event) => {
    setData(event.target.value);
};

  return (
    <>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary" >
          <ArrowBack />
        </Fab>
      </Link>
      <span>QR Scanner</span> 
      <br></br>
      <br></br>
      <BarcodeScannerComponent
        margintop={30}
        width={250}
        height={250}
        delay={300}
        onUpdate={(err, result) => {
          if (result){
           setData(result.text);
          }
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

export default App;
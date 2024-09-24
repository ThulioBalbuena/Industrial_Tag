import React, {useState} from 'react'
import {Fab, TextField} from '@mui/material'
import Grid from '@mui/material/Grid';
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'

function QRgenerator() {
    const [qr, setQr] = useState('Digite os dados aqui');
    const handleChange = (event) => {
        setQr(event.target.value);
    };
    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
      <div>
            <Link to="/">
            <Fab style={{marginRight:10}} color="primary">
                <ArrowBack/>
            </Fab>
            </Link>
            <span>QR Generator</span>
            
            <div style={{marginTop:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                value={qr} label="QR content" size="large" variant="outlined" color="primary" 
                />
            </div>

            <div>
                {
                    qr ?
                    <QRcode 
                        id="myqr"
                        value={qr} 
                        size={75}
                        includeMargin={true}
                    /> :
                    <p>Aguardando dados...</p>
                }
            </div>
            <div>
                {
                    qr ? 
                    <Grid container>
                        <Grid item xs={2}>
                        <Fab onClick={downloadQR} style={{marginLeft:10}} color="secondary">
                            <GetApp/>
                        </Fab>
                        </Grid>
                    </Grid> :
                    ''
                }
            </div>
      </div>
    );
  }
  
  export default QRgenerator;
  
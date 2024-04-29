import {Grid, Button, Typography} from '@material-ui/core';
import Icon from '@mdi/react'
import { mdiQrcode, mdiQrcodeScan, mdiViewList } from '@mdi/js';
import { Link } from "react-router-dom";
import "./logo.css";
import AOS from 'aos';
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


function Home() {
    AOS.init();
    return (
        <div className='Home'>
            <div data-aos="fade-down">
                <Card sx={{ maxWidth: 100 }}>
                <CardMedia
                component="img"
                alt="hkl"
                width="70%"
                height="200"
                image="https://logosmarcas.net/wp-content/uploads/2020/12/Hitachi-Logo."
                />
                </Card>
            </div>
            <div data-aos="fade-right">
            <Typography style={{margin:20}} variant="h2">
            QR Code
            </Typography>
            </div>
            <div data-aos="fade-left">
            <Typography style={{margin:20}} variant="h2">
            Generator & Scanner
            </Typography>
            <hr></hr>
            <br></br>
            </div>
            <Grid  container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center">
                <div data-aos="fade-up">
                <Grid>
                    <Link to="/qr_generator">
                    <Button variant="contained" size="large" color="primary">
                        <Icon 
                        style={{padding:10}}
                        path={mdiQrcode}
                        title="QR Generator"
                        size={10}
                        color="white"
                        />
                    </Button>
                    </Link>
                </Grid>
                </div>
                <br></br>
                <br></br>
                <div data-aos="fade-up">
                <Grid>
                    <Link to="/qr_scanner">
                    <Button variant="contained" size="large" color="secondary">
                        <Icon 
                        style={{padding:10}}
                        path={mdiQrcodeScan}
                        title="QR Scanner"
                        size={10}
                        color="white"
                        />
                    </Button>
                    </Link>
                </Grid>
                <br></br>
                <br></br>
                <Grid>
                    <Link to="/identifier">
                    <Button variant="contained" size="large" color="inherit">
                        <Icon 
                        style={{padding:10}}
                        path={mdiViewList}
                        title="Identifier"
                        size={10}
                        color="green"
                        />
                    </Button>
                    </Link>
                </Grid>
                </div>
            </Grid>
            <br></br>
                <Typography variant="body2" color="text.secondary">
                    Designed & produced by Thúlio Balbuena
                </Typography>
        </div>
    );
  }
  
  export default Home;
  
  //tabela preview var doc = new jsPDF()

//TABELA INICIAL
//horizontal
/* var doc = new jsPDF()
var imagem = 'https://br.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png'
doc.setLineWidth(1)
doc.line(20, 20, 200, 20)
doc.setLineWidth(1)
//vertical
doc.line(20, 20, 20, 120)
//horizontal
doc.setLineWidth(1)
doc.line(200, 120 , 20 , 120)
//vertical
doc.setLineWidth(1)
doc.line(200, 20 , 200, 120) 
doc.setLineWidth(0.5)
doc.line(20, 35, 200 , 35)
doc.setFontSize(20)
doc.text(32 ,30, "HITACHI KOKUSAI LINEAR - ITEM CONFORME")
doc.setLineWidth(0.5)
doc.line(20,45,200,45)
doc.setFontSize(15)
doc.text(25,42, "DESCRIÇÃO:")
//doc.text(60,42, var)
doc.setLineWidth(0.5)
doc.line(20,55,200,55)
doc.text(25,52,"PO:")
//doc.text(60,52,var)
doc.setLineWidth(0.5)
doc.line(20,65,200,65)
doc.text(25,62, "DATA:")
doc.line(110,35,110,65)
doc.text(115,42, "LOCALIZAÇÃO:")
//doc.text(155,42, var)*/


//PRIMEIRA COLUNA 


import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Importa o Grid instável
import Icon from '@mdi/react';  
import { mdiQrcode, mdiQrcodeScan, mdiViewList, mdiWarehouse } from '@mdi/js'; // Adiciona mdiWarehouse para o estoque
import { Link } from "react-router-dom";
import "./logo.css";
import AOS from 'aos';
import * as React from 'react';

function Home() {
    AOS.init();
    return (
        <div className='Home'>
            <div data-aos="fade-right">
                <Typography style={{ margin: 20 }} variant="h2">
                Industrial tag
                </Typography>
            </div>
            <div data-aos="fade-left">
                <Typography style={{ margin: 20 }} variant="h4">
                Generation & Scan
                </Typography>
                <hr></hr>
                <br></br>
            </div>
            <Grid container direction="column" justifyContent="space-between" alignItems="center">
                <div data-aos="fade-up">
                    <Grid>
                        <Link to="/qr_scanner">
                            <Button variant="contained" size="large" color="primary">
                                <Icon 
                                    style={{ padding: 10 }}
                                    path={mdiQrcodeScan}
                                    title="QR Scanner"
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
                        <Link to="/stock">
                            <Button variant="contained" size="large" color="primary">
                                <Icon 
                                    style={{ padding: 10 }}
                                    path={mdiWarehouse}
                                    title="Stock"
                                    size={10}
                                    color="black"
                                />
                            </Button>
                        </Link>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid>
                        <Link to="/identifier">
                            <Button variant="contained" size="large" color="primary">
                                <Icon 
                                    style={{ padding: 10 }}
                                    path={mdiViewList}
                                    title="Identifier"
                                    size={10}
                                    color="white"
                                />
                            </Button>
                        </Link>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid>
                        <Link to="/qr_generator">
                            <Button variant="contained" size="large" color="primary">
                                <Icon 
                                    style={{ padding: 10 }}
                                    path={mdiQrcode}
                                    title="QR Generator"
                                    size={10}
                                    color="black"
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

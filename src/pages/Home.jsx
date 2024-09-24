import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Icon from '@mdi/react';  
import { mdiQrcode, mdiQrcodeScan, mdiViewList } from '@mdi/js';
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
                    QR Code
                </Typography>
            </div>
            <div data-aos="fade-left">
                <Typography style={{ margin: 20 }} variant="h2">
                    Generator & Scanner
                </Typography>
                <hr></hr>
                <br></br>
            </div>
            <Grid container direction="column" justifyContent="space-between" alignItems="center">
                <div data-aos="fade-up">
                    <Grid>
                        <Link to="/qr_generator">
                            <Button variant="contained" size="large" color="primary">
                                <Icon 
                                    style={{ padding: 10 }}
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
                                    style={{ padding: 10 }}
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
                                    style={{ padding: 10 }}
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

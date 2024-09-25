import React, { useState } from 'react';
import { Button, Typography, Modal, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Icon from '@mdi/react';  
import { mdiQrcode, mdiQrcodeScan, mdiViewList, mdiPackageDown, mdiClose, mdiTagMultiple } from '@mdi/js';
import { Link } from "react-router-dom";
import AOS from 'aos';
import './logo.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const closeButtonStyle = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
};

const headerStyle = {
    color: 'black', 
    padding: '20px 10px', // Reduzido o padding lateral, mantendo o espaçamento vertical
    textAlign: 'center', // Centraliza o texto
    width: '100%', // Garante que o header ocupe a largura total da tela
    boxSizing: 'border-box' // Inclui o padding na largura total
  };

const titleStyle = {
  fontWeight: 'bold', // Deixa o título em negrito
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Sombra no texto
  display: 'flex', // Flex para alinhar o título e ícone
  justifyContent: 'center', // Centraliza o conteúdo
  alignItems: 'center', // Alinha verticalmente
  gap: '10px' // Espaçamento entre título e ícone
};

const subtitleStyle = {
  fontWeight: 'lighter', // Texto mais fino para o subtítulo
  marginTop: '10px', // Espaço entre título e subtítulo
};

function Home() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    AOS.init();

    return (
        <div className='Home'>
            {/* Header com melhorias */}
            <div style={headerStyle}>
                <Typography variant="h2" style={titleStyle}>
                    Industrial Tag
                    <Icon path={mdiTagMultiple} size={2} color="black" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))' }} />
                </Typography>
                <Typography variant="h4" style={subtitleStyle}>
                    Generation & Scan
                </Typography>
            </div>

            <Grid container direction="column" justifyContent="space-between" alignItems="center">
                <div data-aos="fade-up">
                    <Grid>
                        <Link to="/qr_scanner">
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#002171' }}>
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
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#002171' }}>
                                <Icon 
                                    style={{ padding: 10 }}
                                    path={mdiPackageDown}
                                    title="Stock"
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
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#002171' }}>
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
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#002171' }}>
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
            </Grid>

            {/* Botão de Help */}
            <Button variant="contained" color="info" onClick={handleOpen} sx={{ marginTop: 3 }}>
                Help!
            </Button>

            {/* Modal de Help */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Informações das Páginas
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Icon path={mdiQrcodeScan} size={1.5} color="#002171" />
                            </Grid>
                            <Grid item>
                                Escanear códigos QR.
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item>
                                <Icon path={mdiPackageDown} size={1.5} color="#002171" />
                            </Grid>
                            <Grid item>
                                Gerenciamento do estoque.
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item>
                                <Icon path={mdiViewList} size={1.5} color="#002171" />
                            </Grid>
                            <Grid item>
                                Identificar itens.
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item>
                                <Icon path={mdiQrcode} size={1.5} color="#002171" />
                            </Grid>
                            <Grid item>
                                Gerar códigos QR.
                            </Grid>
                        </Grid>
                    </Typography>

                    {/* Botão X para fechar o modal */}
                    <IconButton onClick={handleClose} sx={closeButtonStyle}>
                        <Icon path={mdiClose} size={1} color="black" />
                    </IconButton>
                </Box>
            </Modal>

            <br></br>
            <Typography variant="body2" color="text.secondary">
                Clique aqui para obter ajuda
            </Typography>
        </div>
    );
}

export default Home;

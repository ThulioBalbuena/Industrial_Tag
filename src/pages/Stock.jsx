import React, { useState, useEffect } from "react";
import { CircularProgress, MenuItem, FormControl, Select, InputLabel, Fab } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

function StockPage() {
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    // Função para fazer o fetch dos dados
    const fetchStockData = async () => {
      try {
        const response = await fetch("https://polar-island-40233-a2032bd06f30.herokuapp.com/api/qrcodes");
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados do estoque:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">
        <Fab style={{ marginBottom: 20 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <h2>Consulta ao Estoque</h2>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
          <span style={{ marginLeft: "10px" }}>Carregando...</span>
        </div>
      ) : (
        <FormControl fullWidth variant="filled" style={{ marginTop: 20 }}>
          <InputLabel id="product-select-label">Selecione o Produto</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {stockData.map((product, index) => (
              <MenuItem key={index} value={product.codigo}>
                {product.descricao} (Código: {product.codigo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedProduct && (
        <div style={{ marginTop: 20 }}>
          <h3>Detalhes do Produto</h3>
          {stockData
            .filter((product) => product.codigo === selectedProduct)
            .map((product, index) => (
              <div key={index}>
                <p><strong>Código:</strong> {product.codigo}</p>
                <p><strong>Descrição:</strong> {product.descricao}</p>
                <p><strong>Quantidade:</strong> {product.quantidade}</p>
                <p><strong>Localização:</strong> {product.localizacao}</p>
                <p><strong>Data de Recebimento:</strong> {product.dataRecebimento}</p>
                <p><strong>Lote:</strong> {product.lote}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default StockPage;

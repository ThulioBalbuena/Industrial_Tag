from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

# Configurar a conexão com MongoDB usando uma variável de ambiente
mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://thulio:admin@cluster0.mongodb.net/TICKETMASTER?retryWrites=true&w=majority")
client = MongoClient(mongo_uri)
db = client["TICKETMASTER"]
collection = db["Stock"]

# Rota para salvar dados do QR Code
@app.route('/api/qrcodes', methods=['POST'])
def save_qrcode():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "Dados inválidos recebidos."}), 400
        
        print("Dados recebidos:", data)  # Log dos dados recebidos

        # Verificar se já existe um documento com os mesmos campos "codigo", "descricao" e "quantidade"
        existing_data = collection.find_one({
            "codigo": data['codigo'],
            "descricao": data['descricao'],
            "quantidade": data['quantidade'],
            "localizacao": data['localizacao'],
            "lote": data['lote']
        })
        
        if existing_data:
            return jsonify({"message": "Dados já existem no banco de dados."}), 400  # Retorna erro se todos os dados coincidirem
        
        # Se não existir, insere os dados
        collection.insert_one(data)
        return jsonify({"message": "Dados do QR Code salvos com sucesso!"}), 200
    except Exception as e:
        print("Erro ao salvar os dados:", str(e))  # Log de erro
        return jsonify({"error": str(e)}), 500

# Rota para obter todos os dados
@app.route('/api/qrcodes', methods=['GET'])
def get_qrcodes():
    try:
        qrcodes = collection.find()
        return dumps(qrcodes), 200
    except Exception as e:
        print("Erro ao buscar os dados:", str(e))  # Log de erro
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

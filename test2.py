from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)

# Permitir CORS para todas las rutas
CORS(app)

@app.route('/add-client', methods=['POST'])
def add_client():
    data = request.json
    
    file_exists = os.path.isfile('mantenedor_clientes.csv')
    
    with open('mantenedor_clientes.csv', mode='a', newline='', encoding='utf-8') as file:
        fieldnames = ['rut', 'name', 'last_name', 'email', 'phone', 'channel', 'date', 'user']
        writer = csv.DictWriter(file, fieldnames=fieldnames, delimiter=';')
        
        if not file_exists:
            writer.writeheader()
        
        writer.writerow(data)
    
    return jsonify({'message': 'Client saved successfully!'})

if __name__ == '__main__':
    app.run(debug=True)

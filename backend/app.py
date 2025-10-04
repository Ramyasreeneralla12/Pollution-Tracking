import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from pollution_model import get_predictions

# Point static_folder to frontend folder
app = Flask(__name__, static_folder="../frontend")
CORS(app)

# API endpoint for pollution predictions
@app.route('/predict', methods=['GET'])
def predict():
    predictions = get_predictions()
    return jsonify(predictions)

# Root route to serve frontend index.html
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static frontend files (map.js, styles.css)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)

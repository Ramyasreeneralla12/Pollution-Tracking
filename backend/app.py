from flask import Flask, jsonify
from flask_cors import CORS
from pollution_model import get_predictions

app = Flask(__name__)
CORS(app)  # Enable cross-origin for frontend

@app.route('/predict', methods=['GET'])
def predict():
    predictions = get_predictions()
    return jsonify(predictions)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# Fake product list (replace with DB later)
PRODUCTS = [
    {"id": 1, "name": "Shoes", "price": 50, "quantity": 0, "description": "Comfortable sneakers", "image": "shoes.jpg"},
    {"id": 2, "name": "Bag", "price": 30, "quantity": 0, "description": "Stylish backpack", "image": "bag.jpg"},
]

@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(PRODUCTS)

@app.route("/api/checkout", methods=["POST"])
def checkout():
    data = request.get_json()
    print("Received order:", data)
    # In a real app: save order to DB, process payment, etc.
    return jsonify({"message": "Order received", "items": data})

if __name__ == "__main__":
    app.run(debug=True)

from flask import Blueprint, jsonify, request
from .models import Product
from . import db

api_bp = Blueprint('api', __name__)

# This route returns all products as a JSON list
@api_bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

# This route returns a single product as a JSON list
@api_bp.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict())

@api_bp.route("/checkout", methods=["POST"])
def checkout():
    data = request.get_json()
    for item in data:
        product = Product.query.get(item["id"])
        if product and product.quantity >= item.get("quantity", 1):
            product.quantity -= item["quantity"]
        else:
            return jsonify({"error": f"Insufficient quantity for {product.name}"}), 400
    db.session.commit()
    return jsonify({"message": "Order received", "items": data})

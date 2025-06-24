import secrets
from flask import Blueprint, jsonify, make_response, request
from .models import Product, Order, OrderItem
from . import db

api_bp = Blueprint('api', __name__)

@api_bp.route('/init_csrf')
def init_csrf():
    response = make_response({"message": "CSRF token initialized"})
    csrf_token = secrets.token_urlsafe(32)
    response.set_cookie(
        "csrf_token",
        csrf_token,
        httponly=False,   # 讓 JS 可讀取
        secure=True,      # 上線時用 HTTPS
        samesite="Lax"    # 防止部分跨站攻擊
    )
    return response

# This route returns all products as a JSON list
@api_bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.order_by(Product.id).all()
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
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid cart data"}), 400
    
    user_id = data.get("user_id")
    items = data.get("items")
    if not items or not isinstance(items, list):
        return jsonify({"error": "Invalid items list"}), 400

    total = 0
    order_items = []

    try:
        # First, validate stock
        for item in items:
            product = Product.query.get(item["id"])
            quantity = item.get("quantity", 1)

            if not product:
                return jsonify({"error": f"Product ID {item['id']} not found"}), 404
            if product.stock < quantity:
                return jsonify({"error": f"Not enough stock for {product.name}"}), 400

        # Stock is valid — now process the order
        for item in items:
            product = Product.query.get(item["id"])
            quantity = item.get("quantity", 1)
            price = float(product.price)
            total += price * quantity

            product.stock -= quantity  # ✅ Decrease stock

            order_items.append(OrderItem(
                product_id=product.id,
                quantity=quantity,
                unit_price=price
            ))

        order = Order(user_id=user_id, total=total)
        db.session.add(order)
        db.session.flush()      # flush to get order.id

        for item in order_items:
            item.order_id = order.id
            db.session.add(item)

        db.session.commit()

        return jsonify({
            "message": "Order placed successfully!",
            "order_id": order.id,
            "total": str(order.total)
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Checkout failed", "details": str(e)}), 500
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# for prefix of image
ASSET_PREFIX = "https://el132448.github.io/my-assets/demoShop"

class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Product {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price),  # Decimal to float for JSON
            'image': f"{ASSET_PREFIX}/{self.image}",
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    orders = db.relationship('Order', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    total = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('OrderItem', backref='order', lazy=True)

    def __repr__(self):
        return f'<Order #{self.id}>'


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)

    product = db.relationship('Product')

    def __repr__(self):
        return f'<OrderItem {self.product.name} x {self.quantity}>'

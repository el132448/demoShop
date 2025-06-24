from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .models import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/demoShop'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    with app.app_context():
        db.create_all()

    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    return app

import secrets
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .models import db
import os

def create_app():
    
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    # 讀取 CORS_ORIGINS 環境變數，轉成 list，若沒設定給空 list（CORS 不限制 origin）
    origins_str = os.getenv("CORS_ORIGINS", "")
    origins = [origin.strip() for origin in origins_str.split(",") if origin.strip()]

    CORS(app,
         supports_credentials=True,   # 是為了允許攜帶 Cookie。
         origins=origins if origins else "*"
    )
        
    # 初始化 Flask-Limiter，使用用戶 IP 限制請求頻率
    limiter = Limiter(
        key_func=get_remote_address,
        default_limits=["100 per minute"]
    )
    limiter.init_app(app)

    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")
    
    # 🔐 CSRF Protection
    @app.before_request
    def csrf_protect():
        if request.method in ["POST", "PUT", "DELETE"]:
            csrf_token_cookie = request.cookies.get("csrf_token")
            csrf_token_header = request.headers.get("X-CSRF-Token")
            if not csrf_token_cookie or csrf_token_cookie != csrf_token_header:
                return jsonify({"error": "Invalid CSRF token"}), 403

    @app.after_request
    def set_csrf_cookie(response):
        if not request.cookies.get("csrf_token"):
            response.set_cookie("csrf_token", secrets.token_urlsafe(32), httponly=False)
        return response

    return app

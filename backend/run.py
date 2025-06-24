from dotenv import load_dotenv
from app import create_app

load_dotenv()  # 載入 .env

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
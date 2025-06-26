## BACKEND
python -m venv .venv
.\.venv\Scripts\Activate.ps1  (powershell)
.\.venv\Scripts\activate.bat  (cmd)
pip freeze > requirements.txt
pip install -r requirements.txt
python run.py

## BACKEND PACKAGE and IMAGE
docker build -t my-flask-app .
docker run -p 5000:5000 --env-file .env my-flask-app
docker images
docker tag my-flask-app:latest 335909101997.dkr.ecr.ap-northeast-1.amazonaws.com/demo-shop-backend:latest
docker push 335909101997.dkr.ecr.ap-northeast-1.amazonaws.com/demo-shop-backend:latest

## FRONTEND
npm start
npm run build

## DATABASE
- product: product detail
- order: orders by customers
- users: for login
- psql -U postgres -h postgres -p 5432 -d demoShop < C:\Users\somenone\Desktop\demoShop\db_dumps\dump-demoShop-202506241119.sql

## Github
- git pull main main
- git fetch main
- git reset --hard main/main
- Delete all untracked files and folders: 
    clean git clean -fd
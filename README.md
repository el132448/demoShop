
## BACKEND
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py

## DATABASE
- product: product detail
- order: orders by customers
- users: for login
- psql -U postgres -h postgres -p 5432 -d demoShop < C:\Users\somenone\Desktop\demoShop\db_dumps\dump-demoShop-202506241119.sql

## FRONTEND
npm start

## Github
- git pull main main
- git fetch main
- git reset --hard main/main
- Delete all untracked files and folders: 
    clean git clean -fd
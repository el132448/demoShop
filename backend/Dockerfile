# 使用官方 Python 映像
FROM python:3.10-slim

# 設定工作目錄
WORKDIR /app

# 複製檔案
COPY . .

# 安裝依賴
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 啟動 WSGI server（Gunicorn）
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]

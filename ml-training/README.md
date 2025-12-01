# ML Training Service

## 環境變數配置

為了避免硬編碼敏感資訊，請使用環境變數來配置服務：

### 1. 複製配置範例
```bash
cp config.env.example config.env
```

### 2. 編輯配置文件
根據您的環境編輯 `config.env` 文件：

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_ENDPOINT_URL=http://localhost:8000  # 本地 DynamoDB

# Model Configuration
MODEL_VERSION=1.0.0
MODEL_PATH=./models/sentiment_model.pkl
```

### 3. 載入環境變數
```bash
source config.env
```

或者在運行時載入：
```bash
export $(cat config.env | xargs)
```

## 安全注意事項

- 永遠不要將包含真實憑證的 `config.env` 文件提交到版本控制系統
- 將 `config.env` 添加到 `.gitignore` 文件
- 在生產環境中使用安全的密鑰管理服務（如 AWS Secrets Manager）

## 運行服務

```bash
python app/main.py
```

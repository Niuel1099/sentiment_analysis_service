# Simple MLOps Project - Sentiment Analysis Service

### Project Overview
A basic MLOps pipeline for sentiment analysis with model training, serving, and monitoring across multiple services.

## Architecture
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Python/FastAPI│    │  Java/Spring    │    │   Go/Gin        │
│   ML Training   │───▶│  Model Serving  │───▶│   Monitoring    │
│   & Validation  │    │   & Inference   │    │   & Logging     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │    DynamoDB     │    │   DynamoDB      │
│   Training Data │    │  Model Metadata │    │   Predictions   │
│   & Features    │    │   & Versions    │    │   & Metrics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘

### Project Structure
simple-mlops/
├── ml-training/          # Python/FastAPI - Model Training
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   │   └── sentiment_model.py
│   │   ├── data/
│   │   │   └── data_loader.py
│   │   └── utils/
│   │       └── db_utils.py
│   ├── requirements.txt
│   └── Dockerfile
├── model-serving/        # Java/Spring - Model Inference
│   ├── src/main/java/com/mlops/serving/
│   │   ├── ModelServingApplication.java
│   │   ├── controller/
│   │   │   └── PredictionController.java
│   │   ├── service/
│   │   │   └── ModelService.java
│   │   └── model/
│   │       └── PredictionRequest.java
│   ├── pom.xml
│   └── Dockerfile
├── monitoring/           # Go/Gin - Monitoring & Logging
│   ├── main.go
│   ├── handlers/
│   │   └── metrics.go
│   ├── models/
│   │   └── prediction.go
│   ├── go.mod
│   └── Dockerfile
└── docker-compose.yml
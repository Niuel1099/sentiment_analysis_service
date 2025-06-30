# Simple MLOps Project - Sentiment Analysis Service

### 🚀 Project Overview
A comprehensive MLOps pipeline for sentiment analysis demonstrating modern microservices architecture with model training, serving, and monitoring across multiple programming languages and technologies.

## 🏗️ Architecture
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

### 🛠️ Technology Stack

- ML Training Service: Python 3.9+ with FastAPI, scikit-learn, PostgreSQL
- Model Serving Service: Java 17 with Spring Boot, DynamoDB
- Monitoring Service: Go 1.19+ with Gin framework, DynamoDB
- Databases: PostgreSQL for training data, DynamoDB for metadata and predictions
- Containerization: Docker & Docker Compose
- ML Libraries: scikit-learn, joblib, pandas

### 🚀 Quick Start
#### Prerequisites

- Docker and Docker Compose
- Git

### Installation & Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/simple-mlops.git
cd simple-mlops
```
2. Start all services
```bash 
bashdocker-compose up -d
```

3. Verify services are running
```bash 
#Check health endpoints
curl http://localhost:8001/health  # ML Training
curl http://localhost:8002/health  # Model Serving  
curl http://localhost:8003/health  # Monitoring
```

4. Train a model
```bash
curl -X POST http://localhost:8001/train \
     -H "Content-Type: application/json" \
     -d '{"retrain": false}'
```

5. Make predictions
```bash
curl -X POST http://localhost:8002/api/v1/predict \
     -H "Content-Type: application/json" \
     -d '{"text": "This movie is amazing!"}'
```

6. View monitoring metrics
```bash
curl http://localhost:8003/metrics/predictions
curl http://localhost:8003/metrics/model
```

### 📊 API Endpoints
### ML Training Service (Port 8001)

- **POST /train** - Train new model
- **GET /model/info** - Get current model information
- **GET /health** - Health check

### Model Serving Service (Port 8002)

- **POST /api/v1/predict** - Make sentiment predictions
- **GET /api/v1/model/status** - Get model status
- **GET /health** - Health check

### Monitoring Service (Port 8003)

- **GET /metrics/predictions** - Get prediction metrics
- **GET /metrics/model** - Get model performance metrics
- **POST /metrics/alert** - Create monitoring alert
- **GET /health** - Health check

### 📈 Features

- Multi-language Architecture: Python for ML, Java for serving, Go for monitoring
- Scalable Design: Microservices architecture with Docker containers
- Model Versioning: Track model versions and metadata in DynamoDB
- Real-time Monitoring: Track predictions, model performance, and system health
- Data Pipeline: PostgreSQL for training data, DynamoDB for operational data
- Health Checks: Comprehensive health monitoring across all services
- RESTful APIs: Clean API design with proper HTTP status codes and JSON responses

### 🔄 Development Workflow

- Data Preparation: Load training data into PostgreSQL
- Model Training: Use ML Training service to train sentiment analysis models
- Model Deployment: Models are automatically saved and versioned
- Inference: Model Serving service provides real-time predictions
- Monitoring: Track model performance and system metrics

### 🛡️ Production Considerations

- Add authentication and authorization
- Implement proper logging and error handling
- Add model validation and A/B testing
- Set up CI/CD pipelines
- Configure production databases (RDS, DynamoDB)
- Add load balancing and auto-scaling
- Implement monitoring and alerting (Prometheus, Grafana)
- Add data validation and drift detection

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

### 📄 License
This project is licensed under the MIT [License] - see the LICENSE file for details.

### 🙋‍♂️ Support
For questions and support, please open an issue in the GitHub repository or contact the maintainers.

Built with ❤️ using Python, Java, Go, and modern MLOps practices
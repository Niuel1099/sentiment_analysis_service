from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import Dict, Any
from .models.sentiment_model import SentimentModel
from .data.data_loader import DataLoader
from .utils.db_utils import DatabaseManager

app = FastAPI(title="ML Training Service")

class TrainingRequest(BaseModel):
    retrain: bool = False

class ModelInfo(BaseModel): 
    model_id: str
    accuracy: float
    version: str

sentiment_model = SentimentModel()
data_loader = DataLoader()
db_manager = DatabaseManager()

@app.post("/train", response_model=ModelInfo)
async def train_model(request: TrainingRequest):
    try:
        # Load training data from PostgreSQL
        data = await data_loader.load_training_data()
        
        # Train the model
        model_info = await sentiment_model.train(data, retrain=request.retrain)
        
        # Save model and metadata
        await sentiment_model.save_model(model_info)
        
        return model_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/model/info")
async def get_model_info():
    return await sentiment_model.get_current_model_info()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-training"}
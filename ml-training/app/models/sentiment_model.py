from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import uuid
from datetime import datetime
import boto3
import json

class SentimentModel:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.pipeline = None
        self.dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        self.model_table = self.dynamodb.Table('ml_models')
    
    async def train(self, data, retrain=False):
        # Simple sentiment analysis pipeline
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=1000, stop_words='english')),
            ('classifier', LogisticRegression())
        ])
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            data['text'], data['sentiment'], test_size=0.2, random_state=42
        )
        
        # Train model
        self.pipeline.fit(X_train, y_train)
        
        # Evaluate
        predictions = self.pipeline.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        
        model_info = {
            'model_id': str(uuid.uuid4()),
            'accuracy': float(accuracy),
            'version': datetime.now().strftime('%Y%m%d_%H%M%S'),
            'created_at': datetime.now().isoformat()
        }
        
        return model_info
    
    async def save_model(self, model_info):
        # Save model file
        model_path = f"models/sentiment_model_{model_info['version']}.joblib"
        joblib.dump(self.pipeline, model_path)
        
        # Save metadata to DynamoDB
        self.model_table.put_item(Item=model_info)
        
        return model_path
    
    async def get_current_model_info(self):
        response = self.model_table.scan()
        if response['Items']:
            return max(response['Items'], key=lambda x: x['created_at'])
        return None
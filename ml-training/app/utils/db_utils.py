import asyncpg
import boto3
import os
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.postgres_url = os.getenv('DATABASE_URL', 'postgresql://mluser:mlpass@localhost:5432/mlops')
        self.dynamodb = self._setup_dynamodb()
        
    def _setup_dynamodb(self):
        """Setup DynamoDB connection"""
        aws_endpoint = os.getenv('AWS_ENDPOINT_URL')
        
        if aws_endpoint:
            # Local DynamoDB
            return boto3.resource(
                'dynamodb',
                endpoint_url=aws_endpoint,
                region_name='us-east-1',
                aws_access_key_id='dummy',
                aws_secret_access_key='dummy'
            )
        else:
            # AWS DynamoDB
            return boto3.resource('dynamodb', region_name='us-east-1')
    
    async def ensure_dynamodb_tables(self):
        """Ensure DynamoDB tables exist"""
        try:
            # Create ml_models table
            try:
                self.dynamodb.create_table(
                    TableName='ml_models',
                    KeySchema=[
                        {'AttributeName': 'model_id', 'KeyType': 'HASH'}
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'model_id', 'AttributeType': 'S'}
                    ],
                    BillingMode='PAY_PER_REQUEST'
                )
                logger.info("Created ml_models table")
            except Exception as e:
                if "ResourceInUseException" not in str(e):
                    logger.error(f"Failed to create ml_models table: {e}")
            
            # Create predictions table
            try:
                self.dynamodb.create_table(
                    TableName='predictions',
                    KeySchema=[
                        {'AttributeName': 'prediction_id', 'KeyType': 'HASH'}
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'prediction_id', 'AttributeType': 'S'}
                    ],
                    BillingMode='PAY_PER_REQUEST'
                )
                logger.info("Created predictions table")
            except Exception as e:
                if "ResourceInUseException" not in str(e):
                    logger.error(f"Failed to create predictions table: {e}")
                    
        except Exception as e:
            logger.error(f"Failed to setup DynamoDB tables: {e}")
            raise
    
    async def get_postgres_connection(self):
        """Get PostgreSQL connection"""
        return await asyncpg.connect(self.postgres_url)
    
    def get_dynamodb_table(self, table_name: str):
        """Get DynamoDB table resource"""
        return self.dynamodb.Table(table_name)
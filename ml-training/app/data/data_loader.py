import pandas as pd
import asyncpg
import os
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

class DataLoader:
    def __init__(self):
        self.db_url = os.getenv('DATABASE_URL', 'postgresql://mluser:mlpass@localhost:5432/mlops')
    
    async def load_training_data(self) -> pd.DataFrame:
        """Load training data from PostgreSQL"""
        try:
            conn = await asyncpg.connect(self.db_url)
            
            # Create sample data if table doesn't exist
            await self._ensure_sample_data(conn)
            
            query = """
            SELECT text, sentiment 
            FROM training_data 
            WHERE is_active = true
            ORDER BY created_at DESC
            """
            
            rows = await conn.fetch(query)
            await conn.close()
            
            df = pd.DataFrame(rows, columns=['text', 'sentiment'])
            logger.info(f"Loaded {len(df)} training samples")
            
            return df
            
        except Exception as e:
            logger.error(f"Failed to load training data: {e}")
            raise
    
    async def _ensure_sample_data(self, conn):
        """Create sample training data if it doesn't exist"""
        try:
            # Check if table exists
            table_exists = await conn.fetchval("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'training_data'
                )
            """)
            
            if not table_exists:
                # Create table
                await conn.execute("""
                    CREATE TABLE training_data (
                        id SERIAL PRIMARY KEY,
                        text TEXT NOT NULL,
                        sentiment VARCHAR(20) NOT NULL,
                        is_active BOOLEAN DEFAULT true,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """)
                
                # Insert sample data
                sample_data = [
                    ("This movie is amazing and wonderful!", "positive"),
                    ("I love this product, it's fantastic!", "positive"),
                    ("Great service and excellent quality", "positive"),
                    ("This is terrible and awful", "negative"),
                    ("I hate this, it's so bad", "negative"),
                    ("Poor quality and bad service", "negative"),
                    ("It's okay, not great but not bad", "neutral"),
                    ("Average product with decent features", "neutral"),
                ]
                
                await conn.executemany(
                    "INSERT INTO training_data (text, sentiment) VALUES ($1, $2)",
                    sample_data
                )
                
                logger.info("Created sample training data")
                
        except Exception as e:
            logger.error(f"Failed to ensure sample data: {e}")
            raise
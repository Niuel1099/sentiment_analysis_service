package com.mlops.model_serving.model;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.mlops.model_serving.model.PredictionRequest;
import com.mlops.model_serving.model.PredictionResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Service
public class ModelService {
    
    private final DynamoDB dynamoDB;
    private final Table predictionsTable;
    private final Random random = new Random();
    
    public ModelService() {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
        this.dynamoDB = new DynamoDB(client);
        this.predictionsTable = dynamoDB.getTable("predictions");
    }
    
    public PredictionResponse predict(PredictionRequest request) {
        // Simulate model prediction (in real scenario, load actual model)
        double confidence = 0.7 + (random.nextDouble() * 0.3);
        String sentiment = request.getText().toLowerCase().contains("good") || 
                          request.getText().toLowerCase().contains("great") ? "positive" : "negative";
        
        PredictionResponse response = new PredictionResponse();
        response.setPredictionId(UUID.randomUUID().toString());
        response.setSentiment(sentiment);
        response.setConfidence(confidence);
        response.setTimestamp(Instant.now().toString());
        
        // Log prediction to DynamoDB
        logPrediction(request, response);
        
        return response;
    }
    
    private void logPrediction(PredictionRequest request, PredictionResponse response) {
        try {
            Item item = new Item()
                .withPrimaryKey("prediction_id", response.getPredictionId())
                .withString("text", request.getText())
                .withString("sentiment", response.getSentiment())
                .withNumber("confidence", response.getConfidence())
                .withString("timestamp", response.getTimestamp());
            
            predictionsTable.putItem(item);
        } catch (Exception e) {
            // Log error but don't fail the prediction
            System.err.println("Failed to log prediction: " + e.getMessage());
        }
    }
    
    public Map<String, Object> getModelStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("model_loaded", true);
        status.put("last_updated", Instant.now().toString());
        status.put("version", "1.0.0");
        return status;
    }
}
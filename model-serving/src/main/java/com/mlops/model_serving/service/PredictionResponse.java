package com.mlops.model_serving.service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionResponse {
    @JsonProperty("prediction_id")
    private String predictionId;
    
    @JsonProperty("sentiment")
    private String sentiment;
    
    @JsonProperty("confidence")
    private Double confidence;
    
    @JsonProperty("timestamp")
    private String timestamp;
    
    public PredictionResponse() {}
    
    // Getters and setters
    public String getPredictionId() {
        return predictionId;
    }
    
    public void setPredictionId(String predictionId) {
        this.predictionId = predictionId;
    }
    
    public String getSentiment() {
        return sentiment;
    }
    
    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }
    
    public Double getConfidence() {
        return confidence;
    }
    
    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }
    
    public String getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
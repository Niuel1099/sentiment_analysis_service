package com.mlops.model_serving.service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PredictionRequest {
    @JsonProperty("text")
    private String text;
    
    @JsonProperty("model_version")
    private String modelVersion;
    
    public PredictionRequest() {}
    
    public PredictionRequest(String text) {
        this.text = text;
    }
    
    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    public String getModelVersion() {
        return modelVersion;
    }
    
    public void setModelVersion(String modelVersion) {
        this.modelVersion = modelVersion;
    }
}
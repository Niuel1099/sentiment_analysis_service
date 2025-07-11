package com.mlops.model_serving.controller;

import com.mlops.serving.model.PredictionRequest;
import com.mlops.serving.model.PredictionResponse;
import com.mlops.serving.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class PredictionController {
    
    @Autowired
    private ModelService modelService;
    
    @PostMapping("/predict")
    public PredictionResponse predict(@RequestBody PredictionRequest request) {
        return modelService.predict(request);
    }
    
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "healthy");
        status.put("service", "model-serving");
        return status;
    }
    
    @GetMapping("/model/status")
    public Map<String, Object> getModelStatus() {
        return modelService.getModelStatus();
    }
}
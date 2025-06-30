package models

import "time"

type PredictionMetrics struct {
    TotalPredictions int       `json:"total_predictions"`
    PositiveRatio    float64   `json:"positive_ratio"`
    AvgConfidence    float64   `json:"avg_confidence"`
    Timestamp        time.Time `json:"timestamp"`
}

type ModelMetrics struct {
    ModelVersion    string    `json:"model_version"`
    LastUpdated     time.Time `json:"last_updated"`
    RequestsPerHour int       `json:"requests_per_hour"`
    ErrorRate       float64   `json:"error_rate"`
    Timestamp       time.Time `json:"timestamp"`
}

type Alert struct {
    ID          string    `json:"id"`
    Type        string    `json:"type"`
    Message     string    `json:"message"`
    Severity    string    `json:"severity"`
    CreatedAt   time.Time `json:"created_at"`
}
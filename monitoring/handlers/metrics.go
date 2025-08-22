package handlers

import (
	"net/http"
	"time"

	"github.com/nickemma/models"

	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/gin-gonic/gin"
)

var (
    sess = session.Must(session.NewSession())
    db   = dynamodb.New(sess)
)

func GetPredictionMetrics(c *gin.Context) {
    // Query DynamoDB for recent predictions
    tableName := "predictions"
    
    input := &dynamodb.ScanInput{
        TableName: aws.String(tableName),
    }
    
    result, err := db.Scan(input)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    metrics := models.PredictionMetrics{
        TotalPredictions: int(*result.Count),
        Timestamp:       time.Now(),
    }
    
    // Calculate basic metrics
    positiveCount := 0
    totalConfidence := 0.0
    
    for _, item := range result.Items {
        if sentiment := item["sentiment"]; sentiment != nil && *sentiment.S == "positive" {
            positiveCount++
        }
        if confidence := item["confidence"]; confidence != nil {
            if val, err := strconv.ParseFloat(*confidence.N, 64); err == nil {
                totalConfidence += val
            }
        }
    }
    
    if metrics.TotalPredictions > 0 {
        metrics.PositiveRatio = float64(positiveCount) / float64(metrics.TotalPredictions)
        metrics.AvgConfidence = totalConfidence / float64(metrics.TotalPredictions)
    }
    
    c.JSON(http.StatusOK, metrics)
}

func GetModelMetrics(c *gin.Context) {
    metrics := models.ModelMetrics{
        ModelVersion:    "1.0.0",
        LastUpdated:     time.Now().Add(-2 * time.Hour),
        RequestsPerHour: 45,
        ErrorRate:       0.02,
        Timestamp:       time.Now(),
    }
    
    c.JSON(http.StatusOK, metrics)
}

func CreateAlert(c *gin.Context) {
    var alert models.Alert
    if err := c.ShouldBindJSON(&alert); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    alert.ID = "alert-" + time.Now().Format("20060102150405")
    alert.CreatedAt = time.Now()
    
    // In a real scenario, you'd save this alert and possibly trigger notifications
    
    c.JSON(http.StatusCreated, alert)
}
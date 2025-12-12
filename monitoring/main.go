package main

import (
	"github.com/nickemma/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    
    // Health check
    r.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "status":  "healthy",
            "service": "monitoring",
        })
    })
    
    // Metrics endpoints
    r.GET("/metrics/predictions", handlers.GetPredictionMetrics)
    r.GET("/metrics/model", handlers.GetModelMetrics)
    r.POST("/metrics/alert", handlers.CreateAlert)
    
    r.Run(":8080")
}
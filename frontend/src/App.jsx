import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Sparkles,
  Play,
  RefreshCw
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [predictionText, setPredictionText] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState({
    model_id: "model-abc123",
    accuracy: 0.8745,
    version: "20241227_143052",
    status: "active"
  });
  const [metrics, setMetrics] = useState({
    totalPredictions: 127,
    positiveRatio: 0.6535,
    avgConfidence: 0.8234,
    requestsPerHour: 45,
    errorRate: 0.02
  });
  const [recentPredictions, setRecentPredictions] = useState([
    { id: 1, text: "This product is amazing!", sentiment: "positive", confidence: 0.92, time: "2 mins ago" },
    { id: 2, text: "Not satisfied with the quality", sentiment: "negative", confidence: 0.78, time: "5 mins ago" },
    { id: 3, text: "Good value for money", sentiment: "positive", confidence: 0.85, time: "8 mins ago" }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 3),
        requestsPerHour: 40 + Math.floor(Math.random() * 20)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTrainModel = async () => {
    setIsTraining(true);
    // Simulate training API call
    setTimeout(() => {
      setModelInfo(prev => ({
        ...prev,
        accuracy: 0.88 + Math.random() * 0.1,
        version: new Date().toISOString().replace(/[-:]/g, '').substring(0, 15)
      }));
      setIsTraining(false);
    }, 3000);
  };

  const handlePredict = async () => {
    if (!predictionText.trim()) return;
    
    setIsLoading(true);
    // Simulate prediction API call
    setTimeout(() => {
      const isPositive = predictionText.toLowerCase().includes('good') || 
                        predictionText.toLowerCase().includes('great') ||
                        predictionText.toLowerCase().includes('amazing') ||
                        predictionText.toLowerCase().includes('excellent');
      
      const result = {
        predictionId: `pred-${Date.now()}`,
        sentiment: isPositive ? 'positive' : 'negative',
        confidence: 0.7 + Math.random() * 0.3,
        timestamp: new Date().toISOString()
      };
      
      setPredictionResult(result);
      setRecentPredictions(prev => [
        { 
          id: Date.now(), 
          text: predictionText, 
          sentiment: result.sentiment, 
          confidence: result.confidence, 
          time: "Just now" 
        },
        ...prev.slice(0, 4)
      ]);
      setIsLoading(false);
      setPredictionText('');
    }, 1500);
  };

  const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = "blue", trend }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-purple-600' : 
                        color === 'green' ? 'from-green-500 to-emerald-600' :
                        color === 'orange' ? 'from-orange-500 to-red-600' : 'from-purple-500 to-pink-600'}`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <TrendingUp size={12} className={trend > 0 ? '' : 'rotate-180'} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MLOps Dashboard</h1>
                <p className="text-gray-600">Sentiment Analysis Pipeline</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm">
          <TabButton
            id="overview"
            icon={BarChart3}
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton
            id="predict"
            icon={MessageSquare}
            label="Make Prediction"
            active={activeTab === 'predict'}
            onClick={() => setActiveTab('predict')}
          />
          <TabButton
            id="training"
            icon={Brain}
            label="Model Training"
            active={activeTab === 'training'}
            onClick={() => setActiveTab('training')}
          />
          <TabButton
            id="monitoring"
            icon={Activity}
            label="Monitoring"
            active={activeTab === 'monitoring'}
            onClick={() => setActiveTab('monitoring')}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Predictions"
                value={metrics.totalPredictions.toLocaleString()}
                subtitle="Last 24 hours"
                icon={Zap}
                color="blue"
                trend={12}
              />
              <MetricCard
                title="Model Accuracy"
                value={`${(modelInfo.accuracy * 100).toFixed(1)}%`}
                subtitle="Current model"
                icon={Brain}
                color="green"
                trend={2.3}
              />
              <MetricCard
                title="Positive Sentiment"
                value={`${(metrics.positiveRatio * 100).toFixed(1)}%`}
                subtitle="Of recent predictions"
                icon={TrendingUp}
                color="purple"
                trend={-1.2}
              />
              <MetricCard
                title="Avg Confidence"
                value={`${(metrics.avgConfidence * 100).toFixed(1)}%`}
                subtitle="Model confidence"
                icon={CheckCircle}
                color="orange"
                trend={5.7}
              />
            </div>

            {/* Recent Predictions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity size={20} />
                Recent Predictions
              </h3>
              <div className="space-y-3">
                {recentPredictions.map((pred) => (
                  <div key={pred.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 font-medium truncate max-w-md">{pred.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{pred.time}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pred.sentiment === 'positive' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {pred.sentiment}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {(pred.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prediction Tab */}
        {activeTab === 'predict' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sentiment Analysis</h2>
                <p className="text-gray-600">Enter text to analyze its sentiment using our trained model</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text to Analyze
                  </label>
                  <textarea
                    value={predictionText}
                    onChange={(e) => setPredictionText(e.target.value)}
                    placeholder="Enter text here... (e.g., 'This product is amazing!' or 'I'm not satisfied with the quality')"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={handlePredict}
                  disabled={!predictionText.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      Analyze Sentiment
                    </>
                  )}
                </button>

                {predictionResult && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Result</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {predictionResult.sentiment.charAt(0).toUpperCase() + predictionResult.sentiment.slice(1)}
                        </div>
                        <div className="text-sm text-gray-600">Sentiment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {(predictionResult.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {predictionResult.predictionId.substring(0, 8)}...
                        </div>
                        <div className="text-sm text-gray-600">Prediction ID</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Brain size={24} />
                Current Model Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {(modelInfo.accuracy * 100).toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    v{modelInfo.version}
                  </div>
                  <div className="text-sm text-gray-600">Version</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    Active
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Train New Model</h3>
              <p className="text-gray-600 mb-6">
                Retrain the sentiment analysis model with the latest data to improve accuracy and performance.
              </p>
              
              <button
                onClick={handleTrainModel}
                disabled={isTraining}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                {isTraining ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Training in Progress...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Start Training
                  </>
                )}
              </button>

              {isTraining && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={16} className="animate-spin text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Training in progress...</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                  </div>
                  <div className="text-xs text-blue-700 mt-2">This may take a few minutes to complete</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={20} />
                  System Health
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm font-medium">ML Training Service</span>
                    </div>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm font-medium">Model Serving</span>
                    </div>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-sm font-medium">Monitoring Service</span>
                    </div>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Healthy</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Alerts & Notifications
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="text-yellow-600" size={14} />
                      <span className="text-sm font-medium text-yellow-800">Model Drift Warning</span>
                    </div>
                    <div className="text-xs text-yellow-700">
                      Slight decrease in prediction confidence detected
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">2 hours ago</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">No critical alerts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={20} />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {metrics.requestsPerHour}
                  </div>
                  <div className="text-sm text-gray-600">Requests/Hour</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {(metrics.errorRate * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Error Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    850ms
                  </div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    99.8%
                  </div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
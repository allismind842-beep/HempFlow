import React, { useState, useEffect } from 'react';

export const PlatformDashboard: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchStatus();
    if (autoRefresh) {
      const interval = setInterval(fetchStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/platform/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching platform status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading Platform...</p>
        </div>
      </div>
    );
  }

  const { platform, businessUnits } = status;
  const { metrics } = platform;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'offline':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'degraded':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '✅';
      case 'offline':
        return '❌';
      case 'degraded':
        return '⚠️';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🚀 Operational Super Platform
            </h1>
            <p className="text-slate-400">Central Command Center</p>
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {autoRefresh ? '⏸️ Pause' : '▶️ Resume'} Auto-Refresh
          </button>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
          <div className="text-slate-400 text-sm mb-2">Uptime</div>
          <div className="text-3xl font-bold text-green-400">
            {metrics.uptime.toFixed(1)}%
          </div>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
          <div className="text-slate-400 text-sm mb-2">Healthy Units</div>
          <div className="text-3xl font-bold text-green-400">
            {metrics.healthyUnits}/{metrics.totalUnits}
          </div>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
          <div className="text-slate-400 text-sm mb-2">Failed Units</div>
          <div className="text-3xl font-bold text-red-400">
            {metrics.failedUnits}
          </div>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
          <div className="text-slate-400 text-sm mb-2">Last Updated</div>
          <div className="text-sm text-slate-300">
            {new Date(platform.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Business Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessUnits.map((unit: any, index: number) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 transition-all ${
              getStatusColor(unit.status).split(' ')[0]
            } ${getStatusColor(unit.status).split(' ').slice(1).join(' ')}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">
                  {getStatusIcon(unit.status)} {unit.unit.name}
                </h3>
                <p className="text-sm opacity-75">{unit.unit.metadata.description}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold capitalize">{unit.status}</span>
              </div>
              {unit.responseTime && (
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="font-semibold">{unit.responseTime}ms</span>
                </div>
              )}
              {unit.error && (
                <div className="flex justify-between">
                  <span>Error:</span>
                  <span className="font-semibold text-xs">{unit.error}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Last Check:</span>
                <span className="font-semibold">
                  {new Date(unit.lastChecked).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-current opacity-50">
              <div className="text-xs space-y-1">
                <p>Type: {unit.unit.metadata.type}</p>
                {unit.unit.apiEndpoint && (
                  <p>Endpoint: {unit.unit.apiEndpoint}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-slate-400 text-sm">
        <p>
          🔄 Auto-refreshing every 5 seconds | Last updated:{' '}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

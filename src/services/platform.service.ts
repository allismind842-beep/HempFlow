import { BusinessUnit, BUSINESS_UNITS, getEnabledUnits } from '../config/platform.config';
import axios from 'axios';

export interface BusinessUnitStatus {
  unit: BusinessUnit;
  status: 'online' | 'offline' | 'degraded';
  lastChecked: Date;
  responseTime?: number;
  error?: string;
}

export interface PlatformMetrics {
  timestamp: Date;
  uptime: number; // percentage
  totalUnits: number;
  healthyUnits: number;
  failedUnits: number;
  activeUsers?: number;
  totalTransactions?: number;
  revenue?: number;
}

// Check health of a business unit
export const checkUnitHealth = async (
  unit: BusinessUnit
): Promise<BusinessUnitStatus> => {
  const startTime = Date.now();

  try {
    const response = await axios.get(`${unit.apiEndpoint}/health`, {
      timeout: 5000,
    });

    const responseTime = Date.now() - startTime;

    return {
      unit,
      status: response.status === 200 ? 'online' : 'degraded',
      lastChecked: new Date(),
      responseTime,
    };
  } catch (error: any) {
    return {
      unit,
      status: 'offline',
      lastChecked: new Date(),
      error: error.message,
    };
  }
};

// Check all business units
export const checkAllUnitsHealth = async (): Promise<BusinessUnitStatus[]> => {
  const enabledUnits = getEnabledUnits();
  const healthChecks = await Promise.all(
    enabledUnits.map((unit) => checkUnitHealth(unit))
  );

  return healthChecks;
};

// Get platform metrics
export const getPlatformMetrics = async (): Promise<PlatformMetrics> => {
  const statuses = await checkAllUnitsHealth();

  const healthyUnits = statuses.filter((s) => s.status === 'online').length;
  const failedUnits = statuses.filter((s) => s.status === 'offline').length;
  const uptime =
    statuses.length > 0
      ? (healthyUnits / statuses.length) * 100
      : 100;

  return {
    timestamp: new Date(),
    uptime,
    totalUnits: statuses.length,
    healthyUnits,
    failedUnits,
  };
};

// Get unified status report
export const getStatusReport = async () => {
  const statuses = await checkAllUnitsHealth();
  const metrics = await getPlatformMetrics();

  return {
    platform: {
      name: 'Operational Super Platform',
      timestamp: new Date(),
      metrics,
    },
    businessUnits: statuses,
  };
};

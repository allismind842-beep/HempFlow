// Core Platform Configuration
export interface PlatformConfig {
  name: string;
  environment: 'development' | 'staging' | 'production';
  debug: boolean;
  port: number;
  baseUrl: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  enabled: boolean;
  apiEndpoint: string;
  apiKey?: string;
  webhooks?: string[];
  metadata?: Record<string, any>;
}

export const BUSINESS_UNITS: Record<string, BusinessUnit> = {
  hempflow: {
    id: 'hempflow',
    name: 'HempFlow - Delivery Platform',
    enabled: true,
    apiEndpoint: process.env.HEMPFLOW_API_URL || 'http://localhost:3001',
    metadata: {
      description: 'Hemp product delivery service',
      type: 'delivery',
      regions: ['TX', 'CA', 'CO'],
    },
  },
  quantumacoustics: {
    id: 'quantum-acoustics',
    name: 'QuantumAcoustics - Audio Technology',
    enabled: true,
    apiEndpoint: process.env.QA_API_URL || 'http://localhost:3002',
    metadata: {
      description: 'Advanced audio processing and quantum-inspired algorithms',
      type: 'technology',
      focus: ['audio', 'quantum-computing'],
    },
  },
  blackforge: {
    id: 'black-forge',
    name: 'Black Forge - Infrastructure',
    enabled: true,
    apiEndpoint: process.env.BF_API_URL || 'http://localhost:3003',
    metadata: {
      description: 'Hardware and infrastructure management',
      type: 'infrastructure',
      services: ['servers', 'networking', 'storage'],
    },
  },
  jamesholdings: {
    id: 'james-holdings',
    name: 'James Holdings - Corporate',
    enabled: true,
    apiEndpoint: process.env.JH_API_URL || 'http://localhost:3004',
    metadata: {
      description: 'Corporate management and holdings',
      type: 'corporate',
      divisions: ['operations', 'finance', 'strategy'],
    },
  },
  raffamon420: {
    id: 'raffamon420',
    name: 'Raffamon420 - Operations Hub',
    enabled: true,
    apiEndpoint: process.env.RM_API_URL || 'http://localhost:3005',
    metadata: {
      description: 'Central operations coordination',
      type: 'operations',
      responsibilities: ['logistics', 'coordination', 'management'],
    },
  },
};

export const PLATFORM_CONFIG: PlatformConfig = {
  name: 'Operational Super Platform',
  environment: (process.env.NODE_ENV as any) || 'development',
  debug: process.env.DEBUG === 'true',
  port: parseInt(process.env.API_PORT || '3000'),
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
};

// Get all enabled business units
export const getEnabledUnits = (): BusinessUnit[] => {
  return Object.values(BUSINESS_UNITS).filter((unit) => unit.enabled);
};

// Get business unit by ID
export const getBusinessUnit = (id: string): BusinessUnit | undefined => {
  return BUSINESS_UNITS[id];
};

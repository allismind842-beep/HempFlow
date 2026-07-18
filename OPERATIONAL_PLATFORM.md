# Operational Super Platform

Unified command center for managing all business operations across:
- 🌿 HempFlow (Delivery)
- 🎵 QuantumAcoustics (Audio Tech)
- ⚙️ Black Forge (Hardware/Infrastructure)
- 🏢 James Holdings (Corporate)
- 🚀 Raffamon420 (Operations)

## Features

✅ Centralized Dashboard
✅ Real-time Operations Monitoring
✅ Cross-platform Analytics
✅ Unified Authentication
✅ Multi-tenant Architecture
✅ API Integration Layer
✅ Payment Processing (Stripe)
✅ Webhook Management
✅ Audit Logging
✅ Performance Metrics

## Architecture

```
┌─────────────────────────────────────┐
│   Operational Super Platform        │
├─────────────────────────────────────┤
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Hemp  │ │Quantum│ │Black │      │
│  │Flow  │ │Acoustic│ │Forge │     │
│  └──────┘ └──────┘ └──────┘       │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  Central Management Layer    │ │
│  │  - Auth                      │ │
│  │  - Payments                  │ │
│  │  - Analytics                 │ │
│  │  - Webhooks                  │ │
│  └──────────────────────────────┘ │
│                                    │
└─────────────────────────────────────┘
```

## Quick Start

```bash
git clone https://github.com/allismind842-beep/HempFlow.git
cd HempFlow
npm install
npm run dev
```

## Configuration

All business units connect via unified API:

```env
# Platform
PLATFORM_NAME=Operational Super Platform
PLATFORM_ENV=production
PLATFORM_DEBUG=false

# Business Units
HEMPFLOW_ENABLED=true
QUANTUMACOUSTICS_ENABLED=true
BLACK_FORGE_ENABLED=true
JAMES_HOLDINGS_ENABLED=true
RAFFAMON420_ENABLED=true

# Authentication
JWT_SECRET=your_super_secret_key
OAUTH_PROVIDERS=google,github,stripe

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxx

# Monitoring
MONITORING_ENABLED=true
ANALYTICS_ENABLED=true
```

## API Endpoints

### Core Platform
- `GET /api/platform/status` - Platform health
- `GET /api/platform/metrics` - Overall metrics
- `GET /api/platform/units` - All business units status

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/profile` - User profile

### Business Units
- `GET /api/hempflow/*` - Hemp delivery operations
- `GET /api/quantum-acoustics/*` - Audio technology
- `GET /api/black-forge/*` - Infrastructure
- `GET /api/james-holdings/*` - Corporate data
- `GET /api/raffamon420/*` - Operations hub

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Payment history
- `POST /api/payments/refund` - Refund payment

### Webhooks
- `POST /api/webhooks/register` - Register webhook
- `POST /api/webhooks/events` - Webhook events

### Analytics
- `GET /api/analytics/dashboard` - Analytics dashboard
- `GET /api/analytics/reports/:id` - Specific report
- `POST /api/analytics/export` - Export data

## Deployment

### Docker
```bash
docker build -t operational-platform .
docker run -p 3000:3000 operational-platform
```

### Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
```

### Vercel
```bash
vercel deploy --prod
```

## Monitoring

- Real-time dashboards at `/dashboard`
- Metrics available at `/metrics`
- Logs available at `/logs`
- Health checks at `/health`

## Support

For issues or questions:
- GitHub Issues: [HempFlow Issues](https://github.com/allismind842-beep/HempFlow/issues)
- Documentation: See `/docs` folder
- Email: support@operationalplatform.com

## License

MIT License - All business units included

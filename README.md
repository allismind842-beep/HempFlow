# HempFlow - Hemp Delivery Platform

A fast, compliant hemp and CBD product delivery platform for local shops. Order from nearby vendors with quick delivery.

## Features

- 🚀 Fast delivery from local shops
- 📱 Mobile-first responsive design
- 🔒 Compliant with hemp/CBD regulations
- 💳 Secure payment processing
- 📍 Location-based ordering
- ⭐ Real-time order tracking

## Tech Stack

- Frontend: React/TypeScript
- Backend: Node.js/Express
- Database: PostgreSQL
- Authentication: JWT
- Deployment: Docker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 14+

### Installation

```bash
# Clone the repository
git clone https://github.com/allismind842-beep/HempFlow.git
cd HempFlow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/hempflow
JWT_SECRET=your_jwt_secret
API_PORT=3000
NODE_ENV=development
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── styles/         # CSS/styling
│   └── App.tsx         # Main app component
├── public/             # Static assets
├── tests/              # Test files
├── package.json
└── README.md
```

## Development

```bash
# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Subscription delivery service
- [ ] Integration with more local shops
- [ ] Multi-language support

# SkillUp Learning Platform - Complete Project Structure

## Root Structure
```
skillup/
├── package.json                 # Root package.json for monorepo management
├── lerna.json                   # Lerna configuration
├── .dockerignore
├── .gitignore
├── README.md
├── docker-compose.yml          # Development environment setup
├── docker-compose.prod.yml     # Production environment setup
├── packages/                   # All microservices and shared code
├── proto/                      # Shared protobuf definitions for gRPC
├── kubernetes/                 # Kubernetes deployment manifests
├── scripts/                    # Build and deployment scripts
└── docs/                       # Project documentation
```

## Packages Directory
```
packages/
├── api-gateway/                # API Gateway Service
├── user-service/               # User Authentication & Management Service
├── course-service/             # Course Management Service
├── realtime-service/           # WebSocket & Real-time Service
├── notification-service/       # Notifications Service
├── payment-service/            # Payment Processing Service
├── leaderboard-service/        # Leaderboard & Gamification Service
├── admin-service/              # Admin Dashboard Service
└── shared/                     # Shared utilities and code
```

## API Gateway Structure
```
packages/api-gateway/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── config/                 # Configuration files
│   ├── middleware/             # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logging.middleware.ts
│   ├── routes/                 # API routes definitions
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   ├── course.routes.ts
│   │   └── ...
│   ├── grpc/                   # gRPC client implementations
│   │   ├── client.ts           # gRPC client setup
│   │   ├── user.client.ts
│   │   ├── course.client.ts
│   │   └── ...
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## User Service Structure
```
packages/user-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── grpc-server.ts          # gRPC server setup
│   ├── config/                 # Configuration files
│   │   ├── index.ts
│   │   ├── db.config.ts
│   │   └── oauth.config.ts
│   ├── controllers/            # Express route controllers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── models/                 # MongoDB models
│   │   ├── user.model.ts
│   │   └── profile.model.ts
│   ├── services/               # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── grpc/                   # gRPC service implementations
│   │   ├── server.ts
│   │   └── user.service.ts
│   ├── middleware/             # Express middleware
│   ├── routes/                 # Express routes
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Course Service Structure
```
packages/course-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── grpc-server.ts          # gRPC server setup
│   ├── config/                 # Configuration files
│   ├── controllers/            # Express route controllers
│   │   ├── course.controller.ts
│   │   ├── lesson.controller.ts
│   │   └── enrollment.controller.ts
│   ├── models/                 # MongoDB models
│   │   ├── course.model.ts
│   │   ├── lesson.model.ts
│   │   └── enrollment.model.ts
│   ├── services/               # Business logic
│   │   ├── course.service.ts
│   │   ├── lesson.service.ts
│   │   └── enrollment.service.ts
│   ├── grpc/                   # gRPC service implementations
│   │   ├── server.ts
│   │   └── course.service.ts
│   ├── middleware/             # Express middleware
│   ├── routes/                 # Express routes
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Real-time Service Structure
```
packages/realtime-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express & WebSocket server setup
│   ├── config/                 # Configuration files
│   ├── controllers/
│   ├── models/                 # MongoDB models for chat history, etc.
│   ├── services/               # Business logic
│   │   ├── chat.service.ts
│   │   └── room.service.ts
│   ├── websocket/              # WebSocket handlers
│   │   ├── index.ts            # WebSocket server setup
│   │   ├── chat.handler.ts
│   │   └── room.handler.ts
│   ├── redis/                  # Redis client and pub/sub
│   │   ├── client.ts
│   │   └── pub-sub.ts
│   ├── grpc/                   # gRPC client for user verification
│   ├── middleware/             # Express & WebSocket middleware
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Notification Service Structure
```
packages/notification-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── config/                 # Configuration files
│   ├── controllers/            # Express route controllers
│   ├── models/                 # MongoDB models for notifications
│   ├── services/               # Business logic
│   │   └── notification.service.ts
│   ├── rabbitmq/               # RabbitMQ consumers and publishers
│   │   ├── client.ts           # RabbitMQ connection setup
│   │   ├── consumers/          # Message consumers
│   │   └── publishers/         # Message publishers
│   ├── redis/                  # Redis for pub/sub notifications
│   ├── templates/              # Notification templates
│   ├── middleware/             # Express middleware
│   ├── routes/                 # Express routes
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Payment Service Structure
```
packages/payment-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── grpc-server.ts          # gRPC server setup
│   ├── config/                 # Configuration files
│   ├── controllers/            # Express route controllers
│   ├── models/                 # MongoDB models
│   │   ├── transaction.model.ts
│   │   └── subscription.model.ts
│   ├── services/               # Business logic
│   │   ├── payment.service.ts
│   │   └── subscription.service.ts
│   ├── providers/              # Payment provider integrations
│   │   ├── stripe.ts
│   │   └── paypal.ts
│   ├── grpc/                   # gRPC service implementations
│   ├── rabbitmq/               # RabbitMQ for payment events
│   ├── middleware/             # Express middleware
│   ├── routes/                 # Express routes
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Leaderboard Service Structure
```
packages/leaderboard-service/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Express server setup
│   ├── config/                 # Configuration files
│   ├── controllers/            # Express route controllers
│   ├── models/                 # MongoDB models for achievements
│   ├── services/               # Business logic
│   │   ├── leaderboard.service.ts
│   │   └── achievement.service.ts
│   ├── redis/                  # Redis for leaderboards
│   │   ├── client.ts
│   │   └── leaderboard.ts      # Redis sorted sets for leaderboards
│   ├── rabbitmq/               # RabbitMQ for XP events
│   ├── middleware/             # Express middleware
│   ├── routes/                 # Express routes
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## Shared Package Structure
```
packages/shared/
├── src/
│   ├── index.ts
│   ├── constants/              # Shared constants
│   ├── errors/                 # Error classes and handling
│   ├── interfaces/             # TypeScript interfaces
│   ├── utils/                  # Shared utility functions
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── ...
│   └── middleware/             # Shareable middleware
├── package.json
├── tsconfig.json
└── README.md
```

## Proto Directory (gRPC Definitions)
```
proto/
├── user.proto                  # User service proto definitions
├── course.proto                # Course service proto definitions
├── payment.proto               # Payment service proto definitions
└── ...
```

## Kubernetes Directory
```
kubernetes/
├── base/                       # Base Kubernetes manifests
│   ├── api-gateway.yaml
│   ├── user-service.yaml
│   ├── course-service.yaml
│   └── ...
├── overlays/                   # Environment-specific overlays
│   ├── development/
│   ├── staging/
│   └── production/
├── secrets/                    # Secret templates (not actual secrets)
└── config/                     # ConfigMaps
```

## Docker Directory
```
docker/
├── development/
│   ├── mongodb/
│   ├── redis/
│   ├── rabbitmq/
│   └── nginx/
└── production/
```

## Scripts Directory
```
scripts/
├── setup.sh                    # Initial setup script
├── build.sh                    # Build script
├── deploy.sh                   # Deployment script
└── test.sh                     # Test script
```

## Docs Directory
```
docs/
├── architecture/               # Architecture diagrams
├── api/                        # API documentation
├── setup-guide.md              # Setup guide
└── deployment-guide.md         # Deployment guide
```
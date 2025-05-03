# SkillUp - Course Service

## Overview

The Course Service is a key component of the SkillUp learning platform, responsible for managing all aspects related to courses, lessons, and user enrollments. This microservice provides both REST API endpoints and gRPC services for internal communication with other services.

## Features

- **Course Management**: Create, read, update, and delete courses
- **Lesson Management**: Organize course content into lessons with videos, resources, and quizzes
- **Enrollment Tracking**: Track user enrollments and their progress through courses
- **Course Discovery**: Search and filter courses by various criteria
- **Ratings & Reviews**: Collect and manage user feedback on courses

## Tech Stack

- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- gRPC for inter-service communication
- RabbitMQ for event messaging
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- RabbitMQ
- Docker (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
4. Generate gRPC client/server code:
   ```bash
   npm run proto:generate
   ```
5. Start the service:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

### Docker

To run the service with Docker:

```bash
docker build -t skillup-course-service .
docker run -p 3000:3000 --env-file .env skillup-course-service
```

Or using docker-compose from the root directory:

```bash
docker-compose up course-service
```

## API Endpoints

### Courses

- `GET /courses` - List all courses with pagination and filters
- `GET /courses/:id` - Get course details
- `POST /courses` - Create a new course (instructor/admin only)
- `PUT /courses/:id` - Update a course (instructor/admin only)
- `DELETE /courses/:id` - Delete a course (instructor/admin only)
- `GET /courses/search` - Search courses with filters
- `GET /courses/recommended` - Get personalized course recommendations
- `GET /courses/:id/ratings` - Get course ratings and reviews

### Lessons

- `GET /courses/:courseId/lessons` - Get all lessons for a course
- `GET /courses/:courseId/lessons/:id` - Get specific lesson details
- `POST /courses/:courseId/lessons` - Create a new lesson (instructor only)
- `PUT /courses/:courseId/lessons/:id` - Update a lesson (instructor only)
- `DELETE /courses/:courseId/lessons/:id` - Delete a lesson (instructor only)
- `PUT /courses/:courseId/lessons/reorder` - Reorder lessons (instructor only)

### Enrollments

- `GET /enrollments` - Get user's enrolled courses
- `POST /enrollments` - Enroll in a course
- `GET /enrollments/:id` - Get specific enrollment details
- `PUT /enrollments/:id/progress` - Update progress in a course
- `POST /enrollments/:id/complete` - Mark course as completed
- `POST /enrollments/:id/rating` - Rate and review a course
- `GET /courses/:id/enrollments` - Get enrollments for a course (instructor only)

## gRPC Services

The service provides the following gRPC methods:

- `GetCourse` - Get course details by ID
- `ListCourses` - List courses with filters
- `GetUserEnrollments` - Get all courses a user is enrolled in
- `EnrollUser` - Enroll a user in a course
- `UpdateUserProgress` - Update a user's progress in a course
- `CheckUserEnrollment` - Check if a user is enrolled in a specific course

## Project Structure

```
src/
├── index.ts                # Entry point
├── server.ts               # Express server setup
├── grpc-server.ts          # gRPC server setup
├── config/                 # Configuration files
├── controllers/            # Express route controllers
├── models/                 # MongoDB models
├── services/               # Business logic
├── grpc/                   # gRPC service implementations
├── middleware/             # Express middleware
├── routes/                 # Express routes
└── utils/                  # Utility functions
```

## Testing

Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request
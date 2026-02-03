---
name: senior-backend
description: Comprehensive backend development skill for building scalable backend systems using NodeJS, Express, Go, Python, Postgres, GraphQL, REST APIs. Includes API scaffolding, database optimization, security implementation, and performance tuning. Use when designing APIs, optimizing database queries, implementing business logic, handling authentication/authorization, or reviewing backend code.
---

# Senior Backend

Complete toolkit for senior backend development with modern tools and best practices.

## When to use this skill
- Designing REST or GraphQL APIs
- Database schema design and optimization
- Implementing authentication/authorization
- Performance tuning and optimization
- Backend code reviews
- Building scalable microservices

## Tech Stack

**Languages:** TypeScript, JavaScript, Python, Go
**Backend:** Node.js, Express, GraphQL, REST APIs
**Database:** PostgreSQL, Prisma, NeonDB, Supabase
**DevOps:** Docker, Kubernetes, GitHub Actions
**Cloud:** AWS, GCP, Azure

## Core Capabilities

### 1. API Scaffolder
- Automated scaffolding
- Best practices built-in
- Configurable templates

### 2. Database Migration Tool
- Schema migrations
- Performance analysis
- Optimization recommendations

### 3. API Load Tester
- Load testing automation
- Performance metrics
- Bottleneck identification

## Development Workflow

### Setup
```bash
npm install
cp .env.example .env
```

### Quality Checks
```bash
npm run lint
npm run test
npm run build
```

### Deployment
```bash
docker build -t app:latest .
docker-compose up -d
kubectl apply -f k8s/
```

## API Design Patterns

### RESTful Endpoints
```
GET    /api/v1/resources          # List
POST   /api/v1/resources          # Create
GET    /api/v1/resources/:id      # Read
PUT    /api/v1/resources/:id      # Update
DELETE /api/v1/resources/:id      # Delete
```

### Response Format
```json
{
  "success": true,
  "data": { },
  "meta": { "page": 1, "total": 100 }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  }
}
```

## Database Optimization

### Indexing Strategy
- Index frequently queried columns
- Use composite indexes for multi-column queries
- Avoid over-indexing

### Query Optimization
- Use EXPLAIN ANALYZE
- Avoid N+1 queries
- Use pagination for large datasets

### Connection Pooling
```javascript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});
```

## Security Best Practices

### Authentication
- JWT with short expiry
- Refresh token rotation
- Secure password hashing (bcrypt/argon2)

### Authorization
- Role-based access control
- Resource-level permissions
- Principle of least privilege

### Input Validation
- Validate all inputs
- Sanitize user data
- Use parameterized queries

### Headers
```javascript
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

## Performance Targets

| Metric | Target |
|--------|--------|
| P50 Latency | < 50ms |
| P95 Latency | < 200ms |
| P99 Latency | < 500ms |
| Throughput | > 1000 RPS |
| Error Rate | < 0.1% |

## Best Practices

### Code Quality
- Follow established patterns
- Write comprehensive tests
- Document decisions

### Performance
- Measure before optimizing
- Use appropriate caching
- Monitor in production

### Security
- Validate all inputs
- Keep dependencies updated
- Regular security audits

### Maintainability
- Write clear code
- Consistent naming
- Keep it simple

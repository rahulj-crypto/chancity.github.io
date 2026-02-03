---
name: senior-prompt-engineer
description: World-class prompt engineering skill for LLM optimization, prompt patterns, structured outputs, and AI product development. Expertise in Claude, GPT-4, prompt design patterns, few-shot learning, chain-of-thought, and AI evaluation. Includes RAG optimization, agent design, and LLM system architecture. Use when building AI products, optimizing LLM performance, designing agentic systems, or implementing advanced prompting techniques.
---

# Senior Prompt Engineer

World-class senior prompt engineer skill for production-grade AI/ML/Data systems.

## When to use this skill
- Building AI products with LLMs
- Optimizing LLM performance
- Designing agentic systems
- Implementing advanced prompting techniques
- RAG system development
- LLM evaluation and testing

## Core Expertise

- Advanced production patterns and architectures
- Scalable system design and implementation
- Performance optimization at scale
- MLOps and DataOps best practices
- Real-time processing and inference
- Distributed computing frameworks
- Model deployment and monitoring
- Security and compliance
- Cost optimization

## Tech Stack

**Languages:** Python, SQL, R, Scala, Go
**ML Frameworks:** PyTorch, TensorFlow, Scikit-learn, XGBoost
**Data Tools:** Spark, Airflow, dbt, Kafka, Databricks
**LLM Frameworks:** LangChain, LlamaIndex, DSPy
**Deployment:** Docker, Kubernetes, AWS/GCP/Azure
**Monitoring:** MLflow, Weights & Biases, Prometheus
**Databases:** PostgreSQL, BigQuery, Snowflake, Pinecone

## Production Patterns

### Pattern 1: Scalable Data Processing
- Horizontal scaling architecture
- Fault-tolerant design
- Real-time and batch processing
- Data quality validation

### Pattern 2: ML Model Deployment
- Model serving with low latency
- A/B testing infrastructure
- Feature store integration
- Model monitoring and drift detection

### Pattern 3: Real-Time Inference
- Batching and caching strategies
- Load balancing and auto-scaling
- Latency and cost optimization

## Best Practices

### Development
- Test-driven development
- Code reviews and pair programming
- Documentation as code
- Version control everything
- Continuous integration

### Production
- Monitor everything critical
- Automate deployments
- Feature flags for releases
- Canary deployments
- Comprehensive logging

## Performance Targets

| Metric | Target |
|--------|--------|
| P50 Latency | < 50ms |
| P95 Latency | < 100ms |
| P99 Latency | < 200ms |
| Throughput | > 1000 RPS |
| Uptime | 99.9% |
| Error Rate | < 0.1% |

## Security & Compliance

- Authentication & authorization
- Data encryption (at rest & in transit)
- PII handling and anonymization
- GDPR/CCPA compliance
- Regular security audits

## Common Commands

```bash
# Development
python -m pytest tests/ -v --cov
python -m black src/

# Training
python scripts/train.py --config prod.yaml
python scripts/evaluate.py --model best.pth

# Deployment
docker build -t service:v1 .
kubectl apply -f k8s/

# Monitoring
kubectl logs -f deployment/service
```

## Senior-Level Responsibilities

### Technical Leadership
- Drive architectural decisions
- Mentor team members
- Establish best practices
- Ensure code quality

### Strategic Thinking
- Align with business goals
- Evaluate trade-offs
- Plan for scale
- Manage technical debt

### Production Excellence
- Ensure high availability
- Monitor proactively
- Optimize performance
- Respond to incidents

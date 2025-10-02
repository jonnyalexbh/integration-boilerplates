# Docker Deployment Guide for AWS Fargate

This project includes a Dockerfile optimized for AWS Fargate deployment with performance best practices.

## Dockerfile Features

### Multi-stage Build Architecture
- **Stage 1 (Builder)**: Compiles TypeScript and prepares the application
- **Stage 2 (Production)**: Creates final optimized image with production dependencies only

### Security and Performance Features
- **Alpine Linux base** for smaller attack surface and reduced image size
- **Node.js 22.18.0** for latest LTS features and security updates
- **Production-only dependencies** in final image for minimal footprint
- **Direct node execution** of compiled JavaScript (`node dist/src/server.js`)

### AWS Fargate Optimizations
- **Integrated health check** at `/health` endpoint
- **Port 3000** exposed (mappable to 80/443 in Fargate)
- **Optimized npm caching** for faster builds
- **Minimal final image** for better performance

## Prerequisites

### Required Package.json Script
The Dockerfile expects a `build:prod` script. Add this to your `package.json`:

```json
{
  "scripts": {
    "build:prod": "tsc"
  }
}
```

This ensures the Docker build process can compile TypeScript to JavaScript for production.

## Docker Commands

### Build the Docker Image
```bash
# Build the image with latest tag
docker build -t 03-express-ts-starter .
```

### Run Locally for Testing
```bash
# Run container mapping port 3000 to host
docker run -p 3000:3000 03-express-ts-starter
```

### Verify Health Check Endpoint
```bash
# Test the health check endpoint
curl http://localhost:3000/health
# Expected response: {"uptime": <seconds>}
```

## AWS Fargate Deployment

### 1. Build and Push Image to ECR
```bash
# Create ECR repository
aws ecr create-repository --repository-name 03-express-ts-starter

# Get login token for ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag image for ECR
docker build -t 03-express-ts-starter .
docker tag 03-express-ts-starter:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/03-express-ts-starter:latest

# Push image to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/03-express-ts-starter:latest
```

### 2. Task Definition Configuration
```json
{
  "family": "03-express-ts-starter",
  "networkMode": "awsvpc",                    // Required for Fargate
  "requiresCompatibilities": ["FARGATE"],     // Specify Fargate compatibility
  "cpu": "256",                               // CPU units (256 = 0.25 vCPU)
  "memory": "512",                            // Memory in MB
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "express-app",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/03-express-ts-starter:latest",
      "portMappings": [
        {
          "containerPort": 3000,              // Container port
          "protocol": "tcp"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,                       // Check every 30 seconds
        "timeout": 5,                         // Wait 5 seconds for response
        "retries": 3,                         // Try 3 times before marking unhealthy
        "startPeriod": 60                     // Wait 60 seconds before first check
      },
      "logConfiguration": {
        "logDriver": "awslogs",               // Send logs to CloudWatch
        "options": {
          "awslogs-group": "/ecs/03-express-ts-starter",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### 3. Recommended Environment Variables
```bash
# Production environment configuration
NODE_ENV=production
PORT=3000
```

## Monitoring and Logging

### CloudWatch Logs Integration
Logs are automatically sent to CloudWatch with the group `/ecs/03-express-ts-starter`.

### Health Check Configuration
- **Docker Health Check**: Verifies `/health` endpoint every 30s
- **ECS Health Check**: Additional health check every 30s with 5s timeout

### Recommended CloudWatch Metrics
- **CPU Utilization**: Monitor container CPU usage
- **Memory Utilization**: Track memory consumption
- **Task Count**: Monitor running task instances
- **Health Check Failures**: Track unhealthy containers
- **Response Time**: Monitor `/health` endpoint performance

## Production Optimizations

### Security Enhancements
1. **AWS Secrets Manager**: Store sensitive credentials securely
2. **Application Load Balancer**: Configure SSL termination
3. **Auto Scaling**: Set up CPU/Memory-based scaling policies
4. **VPC Configuration**: Deploy in private subnets with NAT Gateway

### Production Environment Variables
```bash
# Essential production settings
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

## Troubleshooting Guide

### Check Container Logs
```bash
# Follow CloudWatch logs in real-time
aws logs tail /ecs/03-express-ts-starter --follow
```

### Debug Container Issues
```bash
# Execute commands inside running container
aws ecs execute-command --cluster <cluster-name> --task <task-arn> --container express-app --interactive --command "/bin/sh"
```

### Test Health Check Endpoint
```bash
# Verify health check from outside container
curl -v http://<fargate-ip>:3000/health
```

### Common Issues and Solutions

#### Container Won't Start
- Check CloudWatch logs for startup errors
- Verify environment variables are set correctly
- Ensure health check endpoint is accessible

#### Health Check Failures
- Verify `/health` endpoint returns 200 status
- Check if application is listening on port 3000
- Review container resource limits (CPU/Memory)

#### Performance Issues
- Monitor CloudWatch metrics for resource utilization
- Consider increasing CPU/Memory allocation
- Review application logs for bottlenecks

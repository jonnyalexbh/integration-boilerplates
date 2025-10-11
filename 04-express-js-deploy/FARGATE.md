# AWS Fargate Configuration Guide

## Dockerfile Features
- ✅ Node.js 18 Alpine (lightweight)
- ✅ Non-root user for security
- ✅ Production dependencies only
- ✅ Optimized layer caching
- ✅ Health check endpoint

## Building the Image
```bash
docker build -t express-fargate-app .
```

## Testing Locally
```bash
docker run -p 3000:3000 express-fargate-app
```

## AWS Fargate Deployment
1. Push image to ECR:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag express-fargate-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/express-fargate-app:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/express-fargate-app:latest
```

2. Create ECS Task Definition with:
   - CPU: 256 (0.25 vCPU)
   - Memory: 512 MB
   - Port mapping: 3000:3000
   - Health check: GET /health

3. Create ECS Service with:
   - Desired count: 1
   - Load balancer target group
   - Security group allowing port 3000

## Environment Variables
Add these to your ECS Task Definition:
- NODE_ENV=production
- PORT=3000 (optional, defaults to 3000)

## Health Check
The app includes a health check endpoint at `/health` that returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

# Cobra events infra

This package contains the cloud infrastructure for this application.

## Configuration

Configuration is done through context.

1. Create a context file

```sh
cp cdk.context.example.json cdk.context.json
```

2. Change the values to match your needs

## Deployment

1. Authenticate your terminal to your AWS account
2. Bootstrap your AWS account for CDK deployments

```sh
npm run cdk bootstrap
```

3. Deploy to your AWS account

```sh
npm run cdk deploy
```

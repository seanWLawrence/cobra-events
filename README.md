# Cobra Events

> This project is a work in progress

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

An open source event management system.

[Read the docs](https://docs.cobra.events) on GitBook

## Tenets

- No percentage-based or confusing fees for organizers or buyers
- No option to resale for higher cost than originally paid
- Accessibility and performance are top priorities
- Configurable and simple to deploy

## Technology

### Services

- AWS for cloud infrastructure
  - CloudFront for CDN
  - CDK/CloudFormation for infrastructure as code
  - Elastic Beanstalk for the Sveltekit node server hosting
  - CodePipeline, CodeBuild and CodeStar connections for CI/CD
  - AWS Budgets for budget alerts
  - Cognito user pools and identity pools for authentication and authorization
    - Login with Google
    - Login with Facebook
    - Login with Amazon
    - Login with Apple
  - DynamoDB for database (TODO)
  - AppSync for GraphQL API (TODO)
  - CloudWatch for metrics, logging and alarms (TODO)
  - AWS Web Application Firewall (WAF) for DDOS and bot protection (TODO)
- GitHub for source code hosting, versioning, releases and testing CI/CD workflows

### Packages and tools

- Sveltekit, using the node adapter
- Tailwind for styling
- Playwright for end-to-end testing
- Vitest for unit and integration testing
- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking
- Commitizen, commitlint, release-please and husky for automating consistent commit messages, semnatic versioning and automated changelog generation
- Node version manager (NVM) for managing node.js versions
- Dotenv for loading environment variables

### Deploy AWS resources

#### Create CDK context file

This file will store all of the conigurable values this infrastructure depends on.

```sh
cp sample.cdk.context.json cdk.context.json
```

#### Create Elastic Beanstalk application

This will create the Elastic Beanstalk application that will contain the environments of our server.

```sh
npx cdk deploy ElasticBeanstalkApplication
```

#### Create Elastic Beanstalk environment

This will need to be done in the console for now, as the CloudFormation and CDK for Elastic Beanstalk environment is complex to set up. When deploying in the console, ensure that yoou follow these conventions:

- Set the environment name and domain name prefix with the format `<app-name>-dev`, for example, if the app name is `cobra-events` it'd be `cobra-events-dev`. This will need to be unique or it'll fail deployment.

Since the environments have CloudFront, you'll likely be able to get away with a single nano instance for the dev environment. This will only cost about $4 a month. For production, you may want to have a larger instance size, multipple instances behind a load balancer, etc.

Recommendations for dev environment:

- Single instance
- Immutable deployment type
- Nano instance size

#### Deploy remaining AWS resources

This will create the CloudFront distribution, pipeline for deploying the Elastic Beanstalk application and AWS Budgets.

```sh
npx cdk deploy --all
```

You're all set up now and ready to develop!

## Next steps

### Deployments

#### Infrastructure deployment

This will trigger the CDK to build locally and deploy your infrastructure changes to AWS.

```sh
npx cdk deploy --all
```

#### Application deployment

This will trigger the pipeline to deploy your latest `dev` branch code to Elastic Beanstalk.

```sh
aws codepipeline start-pipeline-execution --name <app-name>-dev
```

Example

```sh
aws codepipeline start-pipeline-execution --name cobra-events-dev
```

We may automate the deployments in the future, but for now these semi-automated steps are just fine for development.

## Technology

### Services

- AWS for cloud infrastructure
  - CloudFront for CDN
  - CDK/CloudFormation for infrastructure as code
  - Elastic Beanstalk for the Sveltekit node server hosting
  - CodePipeline, CodeBuild and CodeStar connections for CI/CD
  - AWS Budgets for budget alerts
  - Cognito user pools and identity pools for authentication and authorization
    - Login with Google
    - Login with Facebook
    - Login with Amazon
    - Login with Apple
  - DynamoDB for database (TODO)
  - AppSync for GraphQL API (TODO)
  - CloudWatch for metrics, logging and alarms (TODO)
  - AWS Web Application Firewall (WAF) for DDOS and bot protection (TODO)
- GitHub for source code hosting, versioning, releases and testing CI/CD workflows

### Packages and tools

- Sveltekit, using the node adapter
- Tailwind for styling
- Playwright for end-to-end testing
- Vitest for unit and integration testing
- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking
- Commitizen, commitlint, release-please and husky for automating consistent commit messages, semnatic versioning and automated changelog generation
- Node version manager (NVM) for managing node.js versions
- Dotenv for loading environment variables

## License

MIT

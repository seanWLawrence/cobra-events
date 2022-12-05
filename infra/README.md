# Cobra events infra

This package contains the cloud infrastructure for this application.

## Pre-requisites

- An AWS account
- A GitHub account with this forked repository
- A domain

## Getting started

1. Create a certificate using AWS Certificate Manager with the format `api.${domain}`. You'll need to add a CNAME record to your DNS provider.
1. Authenticate your terminal to your AWS account
1. Create a personal access token in GitHub with permissions to read repository contents and read and write to the repository webhooks
1. Create a secret called `github-token` in secrets manager with your GitHub oauth token
1. Create a context file (see below)
1. Enter the certificate's ARN into the `apiCertificateArn` field, the GitHub repository name under `appName` and the other self-explanatory fields at the bottom on the context file.
1. Bootstrap your AWS account for CDK deployments
1. Deploy to your AWS account
1. Log in to Amplify and go to "Domain management" tab. Under "View DNS settings" you'll see ALIAS and CNAME records that you'll need to add to your DNS provider. Update your DNS provider's records to have Amplify hosting point to your domain

## Command recipes

Create context file

```sh
cp cdk.context.example.json cdk.context.json
```

Upload `github-token` secret into Secrets Manager

```sh
aws secretsmanager create-secret --name github-token --secret-string <my-github-secret>
```

Bootstrap your AWS account

```sh
npm run cdk bootstrap
```

Deploy to AWS account

```sh
npm run cdk deploy
```

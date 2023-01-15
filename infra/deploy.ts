#! /usr/bin/env ts-node

import { App } from 'aws-cdk-lib';
import invariant from 'tiny-invariant';
import { config as loadDotEnvFile } from 'dotenv';

import { Budgets } from './budgets.stack';
import { CloudFront } from './cloudfront-stack';
import { Pipeline } from './pipeline.stack';

loadDotEnvFile();

const app = new App();

new Budgets(app, 'Budgets', { maxMonthlyCostInUsd: 5 });

const appName = app.node.tryGetContext('appName');
const domainName = app.node.tryGetContext('domainName');
invariant(appName);
invariant(domainName);

const elasticBeanstalkDomainPrefix = `${appName}-dev`;
const elasticBeanstalkDomain = `${elasticBeanstalkDomainPrefix}.us-east-1.elasticbeanstalk.com`;

new CloudFront(app, 'DevDistribution', {
	elasticBeanstalkDomain,
	customDomains: [`dev.${domainName}`]
});
new Pipeline(app, 'DevPipeline', { branch: 'dev' });

#! /usr/bin/env ts-node

import { App } from 'aws-cdk-lib';
import invariant from 'tiny-invariant';

import { Budgets } from './budgets.stack';
import { CloudFront } from './cloudfront-stack';
import { Pipeline } from './pipeline.stack';

const app = new App();

new Budgets(app, 'Budgets', { maxMonthlyCostInUsd: 5 });

const appName = app.node.tryGetContext('appName');
invariant(appName);

const elasticBeanstalkDomainPrefix = `${appName}.dev`;
const elasticBeanstalkDomain = `${elasticBeanstalkDomainPrefix}.us-east-1.elasticbeanstalk.com`;

new CloudFront(app, 'DevDistribution', { elasticBeanstalkDomain, subdomain: 'dev' });
new Pipeline(app, 'DevPipeline', { branch: 'dev' });

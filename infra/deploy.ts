#! /usr/bin/env ts-node

import { App } from 'aws-cdk-lib';
import invariant from 'tiny-invariant';

import { Budgets } from './budgets.stack';
import { CloudFront } from './cloudfront-stack';
import { ElasticBeanstalkApplication } from './elastic-beanstalk-application.stack';
import { Pipeline } from './pipeline.stack';

const app = new App();

new Budgets(app, 'Budgets', { maxMonthlyCostInUsd: 5 });

const { application } = new ElasticBeanstalkApplication(app, 'ElasticBeanstalkApplication', {});

invariant(application.applicationName);

const elasticBeanstalkDomain = `http://${application.applicationName}.us-east-1.elasticbeanstalk.com/`;

new CloudFront(app, 'DevDistribution', { elasticBeanstalkDomain, subdomain: 'dev' });
new Pipeline(app, 'DevPipeline', { branch: 'dev', application });

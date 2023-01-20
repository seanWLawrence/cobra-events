#! /usr/bin/env ts-node

import { App } from 'aws-cdk-lib';
import invariant from 'tiny-invariant';
import { config as loadDotEnvFile } from 'dotenv';

import { Budgets } from './budgets.stack';
import { CloudFront } from './cloudfront.stack';
import { Server } from './server.stack';
import { Certificate } from './certificate.stack';

loadDotEnvFile();

const app = new App();

new Budgets(app, 'Budgets', { maxMonthlyCostInUsd: 5 });

const appName = app.node.tryGetContext('appName');
const domainName = app.node.tryGetContext('domainName');
invariant(appName);
invariant(domainName);

const { certificate } = new Certificate(app, 'Certificate', {});

const apiDomain = `dev-api.${domainName}`;
const server = new Server(app, 'Server', { certificate, apiDomain });

const cloudfront = new CloudFront(app, 'DevDistribution', {
	apiDomain: `${apiDomain}`,
	customDomains: [`dev.${domainName}`],
	certificate
});

// new Pipeline(app, 'DevPipeline', { branch: 'dev' });
